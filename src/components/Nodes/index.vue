<template lang='pug'>

#nodes
    shared-title(title='Lightning Node Info')
    p {{ activeChannels }} active channels.
    p {{ inChannels.toLocaleString() }} satoshis in lightning channels.
    p {{ confirmedBalance.toLocaleString() }} satoshis available.
    p With a lightning enabled wallet you can open a channel with our node using this information:
    label {{ nodeUri }}
    div(v-html='tag')

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
            return this.$store.state.nodes.lnd.info.identity_pubkey + "@174.6.108.132:9735"
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
