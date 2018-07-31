<template lang='pug'>

#nodes
    shared-title(title='Node Info')
    p Lightning Node Status: Active
    p Open a channel with our node from a lightning wallet using this qr:
    label {{ nodeUri }}
    div(v-html='tag')
    p {{ activeChannels }} active channels.
    p {{ confirmedBalance.toLocaleString() }} satoshis available for channels
    p {{ inChannels.toLocaleString() }} satoshis in lightning channels

</template>

<script>
import qrcode from 'qrcode-generator'
import SharedTitle from '../slotUtils/SharedTitle'

export default {
    computed: {
        inChannels(){
            return parseFloat( this.$store.state.nodes.lnd.wallet.channels.balance )
        },
        activeChannels(){
            return parseFloat( this.$store.state.nodes.lnd.info.num_active_channels )
        },
        confirmedBalance(){
            return parseFloat( this.$store.state.nodes.lnd.wallet.confirmed_balance )
        },
        nodeUri(){
            return this.$store.state.nodes.lnd.info.identity_pubkey + "@dctrl.ca:9735"
        },
        tag(){
            let data = this.nodeUri
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
