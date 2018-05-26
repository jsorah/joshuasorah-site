<template lang="pug">
#main

    nav.navbar.is-primary
      .navbar-brand
        
        nuxt-link(to="/").navbar-item home
        
        nuxt-link(to="/experiments/").navbar-item experiments

        nuxt-link(to="/useful_links/").navbar-item useful links

    #wrapper
        nuxt

    section.hero.footer.is-dark
      p.is-dark This is my footer.  There are many like it, but this one is mine.

</template>