+++
title = "OpenShift Local and GitLab Runners"
date = "2022-04-16"
description = "Configuring OpenShift Local and GitLab Runners"
mermaid = true
categories = ["how-to"]
+++

# Background
_note_: I seem to have started this at some point, but I never finished it, but I feel there's some good stuff in here that might be helpful.

So, I think it would be interesting to set up a "mock" CI/CD environment using OpenShift Local](https://developers.redhat.com/products/openshift-local/overview)

The goal, will be to configure GitLab CI/CD to use a runner deployed in my OpenShift instance using the Gitlab Runner Operator.  The CI/CD job will ultimately trigger a build and push of an image back to the GitLab container registry associated with one of my projects.

And then for fun we will spin up a very basic pod in the same namespace that uses the image.

## High-level Architecture

{{< mermaid >}}
graph LR 
  subgraph GitLab
      subgraph Repository
          %% gl[Source Code]
          gl_cicd[CI/CD]
          gl_image[Container Registry]
      end
  end

  subgraph OpenShift Cluster
    subgraph OpenShift Operators
      gitlab_operator[GitLab Runner Operator]
    end
    subgraph Runner / Project Namespace
      ocp_build_config[Build Config]
      ocp_build[Builds]
      gitlab_runner_crd[Runner CRD]

      gitlab_operator -- creates --> gitlab_runner_pod(Runner Instance)
      gitlab_runner_pod -- creates --> ocp_build_config
      gitlab_runner_pod -. triggers .-> ocp_build
      gitlab_runner_crd -.- gitlab_runner_pod
      %% gitlab_runner_pod --> supplementary_pods((Supplementary <br /> Pods))
      gl_image -- pulls image --> pod((pod))
    end
  end

  gl_cicd<-- Jobs -->gitlab_runner_pod
  gitlab_operator-- reads --> gitlab_runner_crd

  ocp_build_config --> ocp_build
  ocp_build -- pushes image --> gl_image
    

{{< /mermaid>}}

# What do we need?
  - OpenShift Local Installed and Configured
    - Also the "oc" tools package installed.
  - A [git client](https://git-scm.com/downloads)
  - A GitLab account and some repositories
    - Sign-up at [gitlab.com](https://gitlab.com)
  - Your preferred text editor

## OpenShift Local Installed and Configured
Of all the pre-req steps, this is probably the more involved of them.  But don't fret! This is _fairly_ straightforward.  We just need to download OpenShift Local and follow the instructions.  [Install OpenShift on your laptop](https://developers.redhat.com/products/openshift-local/overview)

The installation is some what heavy, as it will leverage VMs to spin up an OpenShift cluster and stack all the components on your machine.  The images are pretty large when unpacked, so make sure you have plenty of disk space allocated.

Configuring the "oc" command is straight forward as well.  Typically, you just need to download the binary for your Operating System and architecture and put it somewhere on the path of your preferred terminal program.


# Alright, we've gotten it set up, now what?

## High-level

1. As kubeadmin
    1. Install gitlab operator
2. As developer
    1. Create runner CRD with tag + registry token from your gitlab project
    2. Tag your jobs to run in the runner (I used openshift)

## Installing the Operator

- Browse to console, login as kubeadmin (or your administrative account)
  - https://console-openshift-console.apps.crc.testing
- Go to OperatorHub under the Operators section on the left navbar.
- Search for `GitLab Runner` - I chose the `Certified` operator.
- Click Install, and let OpenShift do its magic and install the operator.

## Creating the Runner CRD

### Getting the token for registering the runner to your namespace
GitLab Runners use a registration token to associate itself with your CI/CD pipeline.  To do this you'll need to grab a registration token from your GitLab instance.

On `gitlab.com`, this can be found by navigating to your specific project, and going to Settings -> CI/CD -> Runners.  You should see a box with text similar to:

```
Set up a specific runner for a project
Install GitLab Runner and ensure it's running.
Register the runner with this URL:
https://gitlab.com/ 

And this registration token:
1234
```

Keep this value _secret_.

### Creating the secret for storing our runner registration token

{{< code language="yaml" title="gitlab-runner-secret.yml" open="true" >}}
apiVersion: v1
kind: Secret
metadata:
  name: gitlab-runner-secret
type: Opaque
stringData:
  runner-registration-token: 1234
{{< /code >}}


{{< code language="bash" open="true" >}}
oc apply -f gitlab-runner-secret.yml
{{< /code >}}
### Adding the CRD 

{{< code language="yaml" title="gitlab-runner.yml" open="true" >}}
apiVersion: apps.gitlab.com/v1beta2
kind: Runner
metadata:
  name: gitlab-runner
spec:
  gitlabUrl: https://gitlab.com
  buildImage: alpine
  token: gitlab-runner-secret
  tags: openshift
{{< /code >}}


`token` - this should reference the name of the secret we created in the previous step

`tags` - any specific tags you want to use.  By default, hosted GitLab will use its own runners.  Make your own tags to "sticky" to your private runners.

And then apply the template.

{{< code language="bash" open="true" >}}
oc apply -f gitlab-runner.yml
{{< /code >}}

### Validate the Pod Spins up and GitLab now sees it registered.

You should now be able to execute

{{< code language="bash" open="true" >}}
oc get pods
{{< /code >}}


and see a runner instance being spun up for you.

```
NAME                                    READY   STATUS             RESTARTS         AGE
gitlab-runner-runner-7b5bb6b7cc-8vzqg   1/1     Running            11 (70m ago)     7d4h
```

## Creating a sample job to run against the runner

Now, in our GitLab repository where we have done all of this work, we can create a `.gitlab-ci.yml` file containing a tag to force execution on our specific runner.

{{< code language="yaml" title=".gitlab-ci.yml" open="true" >}}
default:
  tags:
    - openshift
    
image: java:8-jdk

stages:
  - build
  - test
  - deploy

before_script:
#  - echo `pwd` # debug
#  - echo "$CI_BUILD_NAME, $CI_BUILD_REF_NAME $CI_BUILD_STAGE" # debug
  - export GRADLE_USER_HOME=`pwd`/.gradle

cache:
  paths:
    - .gradle/wrapper
    - .gradle/caches

build:
  stage: build
  script:
    - ./gradlew assemble
  artifacts:
    paths:
      - build/libs/*.jar
    expire_in: 1 week
  only:
    - master

test:
  stage: test
  script:
    - ./gradlew check

deploy:
  stage: deploy
  script:
    - ./deploy

after_script:
  - echo "End CI"
{{< /code >}}

You should be able to trigger a pipeline run.  For my example, simply commiting to your default branch should do the trick.  It doesn't really matter if this actually executes, you should still be able to see the pod attempt to start and that it went to your local OpenShift cluster.


## Setting up the GitLab registry and push secret

Now, lets move on to another facet of GitLab that is interesting.  There is a local container registry for each project, and we can push built images to this container registry.  I'll walk through the basics of setting this up.

### Personal Access Token for registry push/pull

To access the container on registry, we will need some method of authentication to do so.  GitLab.com offers a way to do this through Personal Access Tokens.  Personal Access Tokens effectively take the place of a password, so they should be treated as sensitive data and should _never_ be committed to any repositories without sufficient encryption.  

For this example, I chose "read" and "write" for the container registry under my project.  I then saved the token for use in the push/pull secret that will be created next.

### Adding the push/pull secret to OpenShift

We can see what the secret would look like in plain text by using the follow command: 

{{< code language="bash" open="true" >}}
oc create secret docker-registry gitlab-container-registry-secret \
  --docker-username=${YOUR_GITLAB_USERNAME} \
  --docker-password=${YOUR_PERSONAL_ACCESS_TOKEN} \
  --docker-server=registry.gitlab.com -o yaml \ 
  --dry-run=client
{{< /code >}}

The output should resemble something like the following:
{{< code language="yaml" open="true" >}}
apiVersion: v1
data:
  .dockerconfigjson: somebase64encodedstuffhere== 
kind: Secret
metadata:
  creationTimestamp: null
  name: gitlab-container-registry-secret
type: kubernetes.io/dockerconfigjson
{{< /code >}}

Drop the `--dry-run=client` argument and it should create the secret on OpenShift for you.

### Trigger the build, and lets watch it push!
