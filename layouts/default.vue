<template lang="pug">
#main

    nav.navbar.is-primary
      .navbar-brand
        
        nuxt-link(active-class="is-active" to="/" exact).navbar-item
            span.icon.is-large
                i.mdi.mdi-home.mdi-24px 
            span home
        
        nuxt-link(active-class="is-active" to="/experiments/" exact).navbar-item 
            span.icon.is-large
                i.mdi.mdi-flask.mdi-24px
            span experiments
        
        nuxt-link(active-class="is-active" to="/useful-links/" exact).navbar-item 
            span.icon.is-large
                i.mdi.mdi-link-variant.mdi-24px
            span useful links

    #wrapper
        nuxt

    //- section.hero.footer.is-dark
    //-   p.is-dark This is my footer.  There are many like it, but this one is mine.

</template>