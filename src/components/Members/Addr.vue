<template lang='pug'>

span.addr
    label(v-if='showAddr') : {{ a }}
    a(:href='"bitcoin:" + this.a')
        img(@click="buildTag", src='../../assets/images/address.svg')
    .tag(v-if='showTag', @click="killTag")
        .qr(v-html='imgTag')

</template>


<script>
import qrcode from 'qrcode-generator'

export default {
    props: ['a'],
    data(){
        return {
            imgTag : '',
            showTag: false,
            showAddr: false
        }
    },
    methods: {
        buildTag(){
            let typeNumber = 4;
            let errorCorrectionLevel = 'L';
            let qr = qrcode(typeNumber, errorCorrectionLevel);
            let data = 'bitcoin:' + this.a
            qr.addData(data)
            qr.make()
            let cellsize = 4
            let margin = 4
            this.imgTag = qr.createImgTag(cellsize, margin)
            this.showTag = true
            this.showAddr = true
        },
        killTag(){
            this.showTag = false
        }
    }
}

</script>

<style lang='stylus' scoped>

img
    position: inline
    height: 2.4em

.tag
    position: fixed; /* Sit on top of the page content */
    width: 100%; /* Full width (cover the whole page) */
    height: 100%; /* Full height (cover the whole page) */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(29,93,99,0.8); /* Black background with opacity */
    z-index: 289768; /* Specify a stack order in case you're using a different order for other elements */
    cursor: pointer; /* Add a pointer on hover */
    padding: 4em

</style>
