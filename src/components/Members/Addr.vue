<template lang='pug'>

.addr
    label {{ a }}
        img(@click="buildTag" src='../../assets/images/address.svg')
    .qr(v-html='imgTag', @click="killTag")

</template>


<script>
import qrcode from 'qrcode-generator'

export default {
    props: ['a'],
    data(){
        return {
            imgTag : ''
        }
    },
    methods: {
        buildTag(){
            if (this.imgTag){
                return this.imgTag = ''
            }
            let typeNumber = 4;
            let errorCorrectionLevel = 'L';
            let qr = qrcode(typeNumber, errorCorrectionLevel);
            let data = 'bitcoin:' + this.a
            qr.addData(data)
            qr.make()
            let cellsize = 4
            let margin = 4
            this.imgTag = qr.createImgTag(cellsize, margin)
        },
        killTag(){
            this.imgTag = ''
        }
    }
}

</script>

<style lang='stylus' scoped>

img
    position: inline
    height: 2.4em

.qr
    content-align: center
    text-align: center


</style>
