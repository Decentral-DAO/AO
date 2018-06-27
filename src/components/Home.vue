<template lang='pug'>

#home
    shared-title(title='dctrl community commons')
    auth
    .intro
        p Welcome to dctrl, smart community application for the singularity.
        p We host &nbsp;
            a(href='https://www.meetup.com/dctrlvan/') meetups &nbsp;
            span that focus on decentralization: Decentralized Currency (Bitcoin), Decentralized Law (cooperatives, smart contracts), Decentralized Production (3D printing, vertical farming, solar energy), and Decentralized Communication (encryption, pgp, meshnet, tor).
    join

</template>

<script>

import SharedTitle from './slotUtils/SharedTitle'
import Auth from './Auth'
import Join from './Join'

export default {
    components:{
        SharedTitle, Auth, Join
    }
}

</script>

<style lang='stylus' scoped>

@import '../styles/colours'

.intro
    padding: 1em

p
    font-size:1.3em
    color:white
    font-family: 'Open Sans', light, sans-serif;

h3
    text-align: left
    color:accent1
    font-family: 'Open Sans', light, sans-serif;

a
    color: accent2
    text-decoration: none;

a:visited
    color: accent1

</style>
