<template lang='pug'>

nav
  router-link(to='/')
      img(src='../assets/images/dctrl.svg')
  li 1 BTC = ${{ cadPrice }}
  li $1 = {{ sats }} satoshis
  navigation

</template>

<script>
import Navigation from './Navigation'

export default {
  components:{
      Navigation
  },

  computed: {
    sats(){
        return ( 100000000 / this.$store.state.cash.spot ).toFixed().toLocaleString()
    },
    cadPrice(){
        return this.$store.state.cash.spot.toLocaleString()
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
