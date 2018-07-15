<template lang='pug'>

#nodes
    shared-title(title='Node Info')
    p Lightning Node Status: Active
    p We have {{ activeChannels }} active channels.
    p We have {{ confirmedBalance }} satoshis.

</template>

<script>

import SharedTitle from '../slotUtils/SharedTitle'

export default {
    computed: {
        activeChannels(){
            return this.$store.state.nodes.lnd.info.num_active_channels
        },
        confirmedBalance(){
            return this.$store.state.nodes.lnd.wallet.confirmed_balance
        }

    },
    components:{
        SharedTitle
    }
}

</script>

<style lang='stylus' scoped>

@import '../../styles/colours'


</style>
