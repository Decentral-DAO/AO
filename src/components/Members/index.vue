<template lang='pug'>

#member
    crazy-btn(v-if='isLoggedIn', to='/member_create', text='new member')
    shared-title(title='Illuminati Hit List')
    .list(v-if="true")
        joiners
        row(v-for="m in $store.getters.activeMembers", :m="m")
        purg
    .padding(v-else)
        p dctrl member
        ol
            li Believer in a transcendent future.
            li Possess dctrl rfid tag.
            li Possible human, magical entity, fairy, cyborg or alien.
        p
            strong visit a node to find out more

</template>

<script>

import _ from "lodash"
import Row from "./Row"
import request from "superagent"
import SharedTitle from '../slotUtils/SharedTitle'
import CrazyBtn from '../slotUtils/CrazyBtn'
import DctrlActive from './DctrlActive'
import Joiners from './Joiners'
import Addr from './Addr'
import Purg from './Purg'

export default {
    components:{
        SharedTitle,
        Row,
        CrazyBtn,
        DctrlActive,
        Joiners,
        Addr,
        Purg,
    }
}

</script>

<style lang='stylus' scoped>

@import '../../styles/colours'
@import '../../styles/input'


#member
    width: 100%

li
    margin-left: 1em

.padding
    padding: 1.987654321em

.cross
    text-decoration: line-through;


</style>
