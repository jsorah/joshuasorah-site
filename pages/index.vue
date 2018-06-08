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
                        .card-content
                            .tile.is-ancestor.is-vertical
                                .tile.is-parent
                                    .tile.is-child.panel.section                                        
                                        h2.panel-heading.has-background-success.has-text-white Programming Languages
                                        .panel-block
                                            .tags
                                                span(v-for="skill in filterLanguage('language')" :class="whichClass(skill.type)").tag {{skill.name}}
                                    .tile.is-child.panel.section                                
                                        h2.panel-heading.has-background-danger.has-text-white Databases
                                        .panel-block
                                            .tags
                                                span(v-for="skill in filterLanguage('database')" :class="whichClass(skill.type)").tag {{skill.name}}
                                    .tile.is-child.panel.section                                
                                        h2.panel-heading.has-background-info.has-text-white Operating Systems
                                        .panel-block
                                            .tags
                                                span(v-for="skill in filterLanguage('os')" :class="whichClass(skill.type)").tag {{skill.name}}                                    
                                .tile.is-parent
                                    .tile.is-child.panel.section
                                        h2.panel-heading.has-background-primary.has-text-white Frameworks
                                        .panel-block
                                            .tags                                
                                                span(v-for="skill in filterLanguage('framework')" :class="whichClass(skill.type)").tag {{skill.name}}                                    
                                    .tile.is-child.panel.section
                                        h2.panel-heading.has-background-warning Tools
                                        .panel-block
                                            .tags
                                                span(v-for="skill in filterLanguage('tool')" :class="whichClass(skill.type)").tag {{skill.name}}
            section.section
                .container
                    
                                        

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

        },
        filterLanguage: function(filter) {            
            return this.skills.filter( thing => thing.type === filter);
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
                    type: "tool"
                },
                {
                    name: "cvs",
                    type: "tool"
                },
                {
                    name: "svn",
                    type: "tool"
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
                    name: "jQuery",
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
                {
                    name: "SoapUI",
                    type: "tool"
                },
                {
                    name: "C#",
                    type: "language"
                }

            ]
        }
    },
    head: {
        meta: [
            { charset: 'utf-8'}
        ],
        title: "Joshua Sorah"
    }
}
</script>
