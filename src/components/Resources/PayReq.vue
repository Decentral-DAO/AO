<template lang='pug'>

.payreq
  a(:href='"bitcoin:" + this.i.payment_request')
    .row
      .six.columns
          label memo: {{i.memo}}
          .box {{ i.payment_request }}
      .six.columns
          label sats: {{i.sats}} ($ {{ cadAmount }})
          div(v-html='imgTag')

</template>

<script>

import qrcode from 'qrcode-generator'
import {satsToCad} from '../../calculations'

export default {
    props: ['i'],
    computed: {
        imgTag(){
            let typeNumber = 10;
            let errorCorrectionLevel = 'L';
            let qr = qrcode(typeNumber, errorCorrectionLevel);
            let data = this.i.payment_request
            try {
                qr.addData(data)
                qr.make()
            } catch(err) {
               return console.log('err from qrcode', err)
            }
            let cellsize = 4
            let margin = 2
            let tag = qr.createImgTag(cellsize, margin)
            return tag
        },
        cadAmount(){
            return satsToCad(this.i.sats, this.$store.state.cash.spot)
        }
    }
}

</script>

<style lang="stylus" scoped>

@import '../../styles/button'
@import '../../styles/colours'
@import '../../styles/skeleton'

.payreq
    color: accent1

.box
    word-wrap:break-word
    max-width: 500px
    z-index: 100001
    padding: 1em


</style>
