<template lang='pug'>

#manage
    shared-title(title='Manage Dctrl Node')
    .row
      .six.columns
        p.input-instructions The fixed amount that is split between the active members each month to cover the costs of operating the space.
        rent-set
      .six.columns
        p.input-instructions We set a maximum amount, or cap, that limits what possibly can be charged. If we hit the cap, we are not covering our costs.
        cap-set
    // Cash events are broken, maybe remove this tracking?
    p Dctrl keeps a small amount of cash on hand. Please record here
    .full.row
      .six.columns
          p.input-instructions Record all cash slipped into admin locker.
          cash-receive
      .six.columns
          p.input-instructions Record Any Cash Expenses.
          cash-expense
    .current Locker Cash Estimate: $ {{ $store.state.cash.cash }}
    .variable Month's Tasks & Projects: $ {{ $store.state.cash.variable.toFixed(2) }}
    .current Currently Active Members: {{ $store.getters.activeMembers.length }}
    .variable Unsubsidized cost per member: $ {{ $store.getters.perMonth }}

</template>

<script>

import SharedTitle from '../slotUtils/SharedTitle'
import CashExpense from '../forms/CashExpense'
import CashReceive from '../forms/CashReceive'
import RentSet from '../forms/RentSet'
import CapSet from '../forms/CapSet'

export default {
    components:{
        SharedTitle, CashExpense, CashReceive, RentSet, CapSet
    },
}

</script>

<style lang='stylus' scoped>

@import '../../styles/colours';
@import '../../styles/skeleton';

.current
    color: green
    font-size: 1.8em
    text-align: center
    margin-top: 2.234em

.variable
    font-size: 1.8em
    margin-top: 2.234em



</style>
