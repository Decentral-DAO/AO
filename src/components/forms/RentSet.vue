<template lang='pug'>

#cashexpense
    form-box(btntxt="Update Rent"  event='rent-set' v-bind:data='details')
        label amount
        input(v-model='details.amount' type='text')

</template>

<script>
import SharedTitle from '../slotUtils/SharedTitle'
import FormBox from '../slotUtils/FormBox'

export default {
    data(){
        return {
            details: {
                amount: 0
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
