<template lang="pug">
    div
        .hero.is-info
            .hero-body
                h1.title.is-1 Experiments
        .container
            section.section
                .card            
                    header.card-header
                        h1.card-header-title Reading temperature using rtl_433
                    .card-content
                        .content
                            p rpi3, cheap sdr, adafruit, mqtt #[a(href="https://github.com/merbanan/rtl_433") rtl_433 ]     

            section.section
                .card
                    header.card-header
                        h1.card-header-title Reading power using rtlamr
                    .card-content
                        p #[a(href="https://github.com/bemasher/rtlamr") rtlamr ], golang, rtl-sdr library
</template>
