<template lang='pug'>

#home
    .intro(v-if='!isLoggedIn')
        p Welcome to dctrl commons,
        p The commons is managed by ao - Autonomous Organization: a community application for non-hierarchical sharing of spaces, tools & toys.
        p It is fully transparent for all participants.
        p We strive to encourage using encryption, Bitcoin, and other empowering technologies.
        p Interested in joining?
        join
        p Decentralization is about accepting responsibility and striving to create.
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
