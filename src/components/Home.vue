<template lang='pug'>

#home
    .intro(v-if='!isLoggedIn')
        p Autonomous Organization, a flat community application for sharing of spaces, tools & toys.
        p We encourage literacy in encryption, Bitcoin, and other empowering technologies.
        p Exploring dogeconciousness is worthy.
        join
        p Decentralization fails without accepting responsibility and striving to create.
    manage(v-else)


</template>

<script>

import SharedTitle from './slotUtils/SharedTitle'
import Auth from './Auth'
import Join from './Join'
import Manage from './Manage'

export default {
    components:{
        SharedTitle, Auth, Join, Manage
    },
    computed: {
        isLoggedIn(){
            return this.$store.getters.isLoggedIn
        },
    }
}

</script>

<style lang='stylus' scoped>

@import '../styles/colours'

.intro
    padding: 1em 0;

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
