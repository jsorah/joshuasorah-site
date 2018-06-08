<template lang="pug">
    div
        .hero.is-info
            .hero-body
                h1.title.is-1 Useful Links

        .container(v-for="linkCategory in linkCategories")
            section.section
                .card            
                    header.card-header
                        h1.card-header-title {{linkCategory.name}}
                    .card-content
                        ul
                            li(v-for="link in linkCategory.links")                            
                                span.icon
                                    i.mdi.mdi-link-variant
                                a(:href="link.url") {{link.name}}                                
                                    //- small {{link.description}}
</template>



<script>
export default {
    asyncData ( context) {
        return { 
            linkCategories: [
                {
                    name: "Programming",
                    links: [
                        { 
                                url: "https://github.com/",
                                name: "GitHub",
                                description: "git Hosting - free public repos, limited private repos"
                        },
                        { 
                                url: "https://bitbucket.org/",
                                name: "Atlassian Bitbucket",
                                description: "git Hosting - free private repos"
                        }
                    ]
                },
                {
                    name: "Security",
                    links: [
                        { 
                                url: "https://krebsonsecurity.com/",
                                name: "Krebs on Security",
                                description: "Brian Krebs Blog"
                        },
                        { 
                                url: "https://www.hackthebox.eu/",
                                name: "Hack The Box - Penetration Labs / Challenges",
                                description: ""
                        }
                    ]
                },
                {
                    name: "Radio",
                    links: [
                        { 
                                url: "https://hamstudy.org/",
                                name: "Ham Study",
                                description: "Excellent study tools for getting your ham radio license "
                        }                        
                    ]
                }
            ]
        }
    },
    head: {
        meta: [
            { charset: 'utf-8'}
        ],
        title: "Joshua Sorah - Useful Links"
    }
}
</script>