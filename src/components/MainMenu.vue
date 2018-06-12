<template lang='pug'>

nav
  router-link(to='/')
      img(src='../assets/images/dctrl.svg')
  div(v-if='$store.getters.isLoggedIn')
      li 1 BTC = ${{ cadPrice.toFixed(2).toLocaleString() }}
      li $1 = {{ sats.toLocaleString() }} satoshis
  navigation

</template>

<script>
import Navigation from './Navigation'
import { cadToSats } from '../calculations'

export default {
  components:{
      Navigation
  },

  computed: {
    sats(){
        let sats = cadToSats( 1 , this.$store.state.cash.spot )
        return parseInt( sats )
    },
    cadPrice(){
        return this.$store.state.cash.spot
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '../styles/colours'
@import '../styles/framework'
@import '../styles/breakpoints'

nav
    display: flex;
    width: 100%;
    flex-direction: column;

img
    padding: 2rem
    height: 160px

li
    margin-left: 3em


</style>
