<template lang="pug">
    div
        .hero.is-info
            .hero-body
                h1.title.is-1 Welcome!

        .container
            section.section
                .container        
                    .card
                        header.card-header.has-background-grey
                            h1.card-header-title.has-text-white About Me - Joshua Sorah
                        .card-content
                            .content
                                p I have been a technology professional for almost 10 years and involved with computers in some fashion for over 20 years.                                

            section.section
                .container                   
                    .card
                        header.card-header.has-background-grey
                            h1.card-header-title.has-text-white Technologies
                        header.card-header
                            .card-content
                                .tags
                                    span(:class="whichClass('database')").tag Databases
                                    span(:class="whichClass('framework')").tag Frameworks
                                    span(:class="whichClass('os')").tag Operating Systems
                                    span(:class="whichClass('language')").tag.is-info Programming Language                                    
                                    span(:class="whichClass('tool')").tag Tools                                    
                                    
                                    span(:class="whichClass('other')").tag Everything Else
                        .card-content
                            .tags
                                span(v-for="skill in skills" :class="whichClass(skill.type)").tag {{skill.name}}                                

</template>

<script>

export default {
    methods: {
        whichClass(skillType) {
            switch (skillType) {

                case "framework":
                    return "is-primary";
                    break;
                case "language":
                    return "is-success";
                    break;
                case "os":
                    return "is-info";
                    break;
                case "database":
                    // only if someone enables autocommit...
                    return "is-danger";
                    break;
                case "tool":
                    // not really a warning :-)
                    return "is-warning";
                    break;
                default:
                    return "is-dark";

            }

        }
    },
    asyncData ( context ) {
        return {             
            skills: [
                {
                    name: "Java",
                    type: "language"
                },            
                {
                    name: "HTML",
                    type: "language"
                },
                {
                    name: "CSS",
                    type: "language"
                },
                {
                    name: "Linux (RHEL/CentOS, Debian)",
                    type: "os"
                },
                {
                    name: "FreeBSD",
                    type: "os"
                },
                {
                    name: "Windows",
                    type: "os"
                },
                {
                    name: "git",
                    type: "version-control"
                },
                {
                    name: "cvs",
                    type: "version-control"
                },
                {
                    name: "svn",
                    type: "version-control"
                },
                {
                    name: "bash",
                    type: "language"
                },
                {
                    name: "Docker",
                    type: "tool"
                },
                {
                    name: "Java EE",
                    type: "framework"
                },
                {
                    name: "Spring",
                    type: "framework"
                },
                {
                    name: "REST Services",
                    type: "framework"
                },
                {
                    name: "SOAP/XML Services",
                    type: "framework"
                },
                {
                    name: "SAML",
                    type: "framework"
                },
                {
                    name: "MySQL",
                    type: "database"
                },
                {
                    name: "Oracle RDBMS (11g/12c)",
                    type: "database"
                },
                {
                    name: "Postgres",
                    type: "database"
                },
                {
                    name: "Sonarqube",
                    type: "tool"
                },
                {
                    name: "Jenkins",
                    type: "tool"
                },
                {
                    name: "Angular",
                    type: "framework"
                },
                {
                    name: "Vue",
                    type: "framework"
                },
                {
                    name: "Javascript",
                    type: "language"
                },
                {
                    name: "Python",
                    type: "language"
                },
                {
                    name: "Gradle",
                    type: "tool"
                },
                {
                    name: "Maven",
                    type: "tool"
                },
                {
                    name: "Sonatype Nexus OSS",
                    type: "tool"
                },
                {
                    name: "Intellij IDEA",
                    type: "tool"
                },
                {
                    name: "Eclipse",
                    type: "tool"
                },
                {
                    name: "Visual Studio",
                    type: "tool"
                },
                {
                    name: "GitLab",
                    type: "tool"
                },
                {
                    name: "MQ (Websphere MQ, RabbitMQ)",
                    type: "tool"
                },
                {
                    name: "FileNet CPE",
                    type: "tool"
                },
                {
                    name: "ACORD Standard XML",
                    type: "framework"
                },

            ]
        }
    }
}
</script>