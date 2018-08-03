<template lang='pug'>

#home
    .intro
        p Welcome to dctrl commons,
        p The commons is managed by ao: a community application that facilitates non-hierarchical sharing of spaces, tools & toys.
        p It is fully transparent for all participants.
        p We strive to encourage using encryption, bitcoin, and other empowering technologies.
        p Interested in joining?
        p Request your alias:
        join
        p Decentralization is about accepting responsibility and striving to create.

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
