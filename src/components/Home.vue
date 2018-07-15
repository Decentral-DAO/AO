<template lang='pug'>

#home
    .intro
        p Welcome to dctrl commons,
        p ao is a community building application that facilitates non-hierarchical cooperation and sharing of tools & toys.
        p It is fully transparent for all participants.
        p We strive to encourage using encryption, bitcoin, and other personally empowering technologies (insert platitude here about great power and responsibility)
        p Interested in joining?
        p Request your alias:
        join
        p Decentralization is about accepting personal responsibility and striving to create.

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
