<template lang='pug'>

#cashexpense
    form-box(btntxt="Update Fixed Costs"  event='rent-set' v-bind:data='details')
        label Set Fixed Cost:
        input(v-model='details.amount' type='text')

</template>

<script>
import SharedTitle from '../slotUtils/SharedTitle'
import FormBox from '../slotUtils/FormBox'

export default {
    data(){
        return {
            details: {
                amount: this.$store.state.cash.rent
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
