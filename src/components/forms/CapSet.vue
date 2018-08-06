<template lang='pug'>

#cashexpense
    form-box(btntxt="Update Maximum Monthly Charge"  event='cap-set' v-bind:data='details')
        label Set Monthly Cap:
        input(v-model='details.amount' type='text')

</template>

<script>
import SharedTitle from '../slotUtils/SharedTitle'
import FormBox from '../slotUtils/FormBox'

export default {
    data(){
        return {
            details: {
                amount: this.$store.state.cash.cap
            }
        }
    },
    components: {
        SharedTitle, FormBox
    }
}

</script>

<style lang='stylus' scoped>

@import '../../styles/colours'


</style>
