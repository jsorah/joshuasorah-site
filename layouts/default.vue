<template lang="pug">
#main

    nav.navbar.is-primary
      .navbar-brand
        
        nuxt-link(active-class="is-active" to="/" exact).navbar-item home
        
        nuxt-link(active-class="is-active" to="/experiments/" exact).navbar-item experiments

        nuxt-link(active-class="is-active" to="/useful_links/" exact).navbar-item useful links

    #wrapper
        nuxt

    section.hero.footer.is-dark
      p.is-dark This is my footer.  There are many like it, but this one is mine.

</template>