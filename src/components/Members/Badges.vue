<template lang='pug'>

.badges
  router-link(v-if='isMrClean' to='/')
      img(src='../../assets/images/mrclean.jpg')
  template(v-for='b in uniqueBadges')
      router-link(v-if='b.badge === "admin"' to='/')
          img(src='../../assets/images/admin.svg')
      router-link(v-if='b.badge === "secure"' to='/badges/secure')
          img(src='../../assets/images/secure.svg')
      router-link(v-if='b.badge === "bitcoin"' to='/')
          img(src='../../assets/images/bitcoin.svg')
      router-link(v-if='b.badge === "doge"' to='/')
          img(src='../../assets/images/doge.png')
      router-link(v-if='b.badge === "pencil"' to='/')
          img(src='../../assets/images/pencil.svg')
      router-link(v-if='b.badge === "bullet"' to='/')
          img(src='../../assets/images/bullet.svg')
      router-link(v-if='b.badge === "bitpepsi"' to='/')
          img(src='../../assets/images/bitpepsi.png')
      router-link(v-if='b.badge === "lightning"' to='/')
          img(src='../../assets/images/lightning.svg')

</template>

<script>

export default {
    name: 'badges',
    props: ['m'],
    computed: {
        isMrClean(){
            let isMrClean = this.$store.getters.mrclean == this.m.memberId
            return isMrClean
        },
        uniqueBadges(){
            let unique = []
            return this.m.badges.filter( b => {
                if ( unique.indexOf(b.badge) === -1){
                    unique.push(b.badge)
                    return true
                }
                return false
            })
        }
    },

}

</script>

<style lang='stylus' scoped>

img
    height: 2em
    padding-left: .2345em
    padding-right: .2345em

a:nth-child(odd)
      img
          padding-top: 1.2em

</style>
