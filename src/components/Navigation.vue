<template lang='pug'>

.navigation
    router-link(v-if='$store.getters.isLoggedIn' to='/Account') Account
    router-link(v-if='$store.getters.isLoggedIn' to='/NODES') Our Nodes
    router-link(v-if='$store.getters.isLoggedIn' to='/HISTORY') Recent History
    router-link(to='/MEMBERS') Members
    router-link(to='/TASKS') Tasks
    router-link(to='/PROJECTS') Projects
    router-link(to='/FOBTAP') Fobtap Points
    //- router-link(to='/EVENTS') Events

</template>

<script>

import Auth from './Auth'

export default {
    name: 'navigation',
    components: { Auth }
}
</script>

<style lang="stylus" scoped>

@import '../styles/colours'

.navigation
  margin-left:47px

a
  text-decoration: none;
  color: accent1
  padding: 10px 20px;
  margin-bottom: 3px;
  list-style: none;
  font-family:sans-serif
  display: block;
  margin-bottom:0px
  max-width:360px
  text-align:center;
  background-color:accent5
  width: 200px

a:hover, .router-link-active
  background-color: accent4
  color:contentColour

.admin
  color: main
  background: green
  border-radius: .6em
  padding: .5em

li
    color: accent2

</style>
