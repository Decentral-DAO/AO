<template lang='pug'>

#nodes
    shared-title(title='Node Info')
    p Lightning Node Status: Active
    p We have {{ activeChannels }} active channels.
    p We have {{ confirmedBalance }} satoshis.
    p Connect to our node from a lightning wallet using this qr:
    div(v-html='tag')

</template>

<script>
import qrcode from 'qrcode-generator'
import SharedTitle from '../slotUtils/SharedTitle'

export default {
    computed: {
        activeChannels(){
            return this.$store.state.nodes.lnd.info.num_active_channels
        },
        confirmedBalance(){
            return this.$store.state.nodes.lnd.wallet.confirmed_balance
        },
        tag(){
            let data = this.$store.state.nodes.lnd.info.identity_pubkey + "@dctrl.ca:9735"
            let typeNumber = 10;
            let errorCorrectionLevel = 'L';
            let qr = qrcode(typeNumber, errorCorrectionLevel);
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
    },
    components:{
        SharedTitle
    }
}

</script>

<style lang='stylus' scoped>

@import '../../styles/colours'


</style>
