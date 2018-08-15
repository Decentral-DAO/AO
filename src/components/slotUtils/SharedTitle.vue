<template lang="pug">

div
    h3 {{ title }}
        slot

</template>

<script>
export default {
  props: ['title'],
}
</script>

<style lang='stylus' scoped>

@import '../../styles/colours'

div
    //width: 100%
    border-bottom-style: dotted
    border-bottom-width: .4em
    border-color: accent4
    color: accent4
    padding-top: 3em
    background: main
    //padding-left:3.4567em
    padding-top: 1.5em
    padding-bottom: 1.5em
    text-align:center
    h3
        font-size: 2.2em
        margin:0
  


</style>
