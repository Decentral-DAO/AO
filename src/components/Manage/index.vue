<template lang='pug'>

#manage
    shared-title(title='Manage Cash')
    h4 Current Cash: {{bal}}
    .full.row
      .six.columns
          label Record Cash Receive
          cash-receive
      .six.columns
          label Record Cash Expense
          cash-expense
    .row
        label Update the communal rent
        rent-set
</template>

<script>

import SharedTitle from '../slotUtils/SharedTitle'
import CashExpense from '../forms/CashExpense'
import CashReceive from '../forms/CashReceive'
import RentSet from '../forms/RentSet'

export default {
    components:{
        SharedTitle, CashExpense, CashReceive, RentSet
    },
    computed:{
      bal(){
          return '$' + this.$store.state.cash.cash.toFixed(2)
      }
    }
}

</script>

<style lang='stylus' scoped>

@import '../../styles/colours'
@import '../../styles/skeleton'

label
    width: 100%
    background: accent4
    color: white


</style>
