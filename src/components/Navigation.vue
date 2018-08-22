<template lang='pug'>

ul.navigation
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

.side_bar ul
  margin-left: 10px;

.toggle ul
  padding-left:0;

a
  text-decoration: none;
  color: accent1
  padding: 10px 20px;
  margin-bottom: 0;
  margin-left:auto;
  margin-right:auto;
  //border-style:solid
  //border-width:3px
  //border-radius: 30px
  //border-color:accent1
  list-style: none;
  font-family:sans-serif
  display: block;
  //margin-bottom:.54321em
  margin-bottom:5px
  max-width:360px
  text-align:center;

  background-color:accent5

a:hover, .router-link-active
  background-color: accent4
  //border-radius:30px
  color:contentColour

.admin
  color: main
  background: green
  border-radius: .6em
  padding: .5em

li
    color: accent2

</style>
