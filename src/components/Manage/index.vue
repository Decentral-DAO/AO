<template lang='pug'>

#manage
    shared-title(title='Manage Dctrl Node')
    p The amount that is split between the active members at the start of the month is the sum of the fixed costs, set below, and the variable costs that grow as tasks are claimed.
    .row
        p.input-instructions Update the communal fixed cost. This covers the rent, internet and other recurring burdens.
        rent-set
    p At the start of the month the cost is split equally between all active members. To make the cost to members more predictable we set a maximum amount, or cap, that limits what possibly can be charged. If we hit the cap, we are not covering our costs.
    .row
        p.input-instructions Update the monthly cap.
        cap-set
    // Cash events are broken, maybe remove this tracking?
    //- p Dctrl keeps a small amount of cash on hand ( Current Cash: {{bal}} ). If you are accepting or receiving cash on behalf of the commons please record here:
    //- .full.row
    //-   .six.columns
    //-       label Record Cash Received
    //-       cash-receive
    //-   .six.columns
    //-       label Record Cash Used
    //-       cash-expense

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
    // computed:{
    //   bal(){
    //       let cash = this.$store.state.cash.cash
    //       if (cash) {
    //           return '$' + cash
    //       }
    //       return '$???'
    //   }
    // }
}

</script>

<style lang='stylus' scoped>

@import '../../styles/colours';
@import '../../styles/skeleton';

</style>
