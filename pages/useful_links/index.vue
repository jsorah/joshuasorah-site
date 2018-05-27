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
                                a(:href="link.url") {{link.name}}                                
                                    //- small {{link.description}}
</template>



<script>
export default {
    asyncData ( context) {
        return { 
            linkCategories: [
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
                    name: "Place Holder",
                }
            ]
        }
    }
}
</script>