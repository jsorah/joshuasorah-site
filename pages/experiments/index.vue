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
                            p I have a cheap little #[a(href="https://www.amazon.com/ThermoPro-TP50-Digital-Thermometer-Temperature/dp/B01H1R0K68/ref=sr_1_3?s=industrial&ie=UTF8&qid=1527943334&sr=8-3&keywords=thermpro") ThermoPro TP50] thermometer that outputs its data on the 433 ISM band.
                            p Using an inexpensive SDR dongle, Raspberry Pi 3, and #[a(href="https://github.com/merbanan/rtl_433") rtl_433 ] it is possible to log this data to some kind of data store.
                            p The approach I took - I wrote a python script that consumes the data from rtl_433 and places it on an MQTT queue.  The MQTT queue is read and pumps the data into #[a(href="https://io.adafruit.com") Adafruit IO]

            section.section
                .card
                    header.card-header
                        h1.card-header-title Reading power using rtlamr
                    .card-content
                        .content
                            p Power meters are everywhere, and electric companies are getting #[strike lazier] smarter about how they read these things.  What you may not realize is that *anyone* can read the data they output, if they would only listen.
                            p Using the #[a(href="https://github.com/bemasher/rtlamr") rtlamr ] library, spending some time with golang and rtl-sdr, you can again get this data, very similar to the rtl_433 experiment I did.
</template>

<script>
export default {    
    head: {
        meta: [
            { charset: 'utf-8'}
        ],
        title: "Joshua Sorah - Experiments"
    }
}
</script>