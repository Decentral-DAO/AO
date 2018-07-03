<template lang='pug'>

#home
    .intro
        p Welcome to dctrl commons, smart community application.
        p Interested in joining?
        p Request your alias and set potential password:
        join
        p Decentralize

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
