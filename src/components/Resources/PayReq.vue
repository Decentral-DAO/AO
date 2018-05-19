<template lang='pug'>

.payreq
    div(v-html='imgTag')
    label memo: {{i.memo}}
    label sats: {{i.sats}} ($ {{ cadAmount }})

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
@import '../../styles/grid'
@import '../../styles/colours'

.payreq
    width: 100%

.payreqtxt
    overflow-wrap: break-word;
    word-wrap: break-word
    max-width:100%


</style>
