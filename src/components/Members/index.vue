<template lang='pug'>

#member
    crazy-btn(v-if='isLoggedIn', to='/member_create', text='new member')
    shared-title(title='Illuminati Hit List')
    .list(v-if="loggedIn")
        p Currently there are {{ activeMembers.length }} sharing this dctrl commons node. Cost per month is
            span &nbsp;
            span(v-if="perMonth < cap") ${{ perMonth }} each.
            span(v-else) $
                span.cross {{ perMonth }}
                span - {{ cap }} each. Warning cap breached! At this member count this node is not self sustaining!
        joiners
        row(v-for="m in activeMembers", :m="m")
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
    computed: {
        activeMembers(){
            let active = this.$store.state.members.filter(m => {
                let isAdmin = m.badges.some( b => {
                    return (b.badge === 'admin')
                })
                return (m.active > 0 && !isAdmin)
            })
            let withRecent = active.map( (m, i) => {
                this.$store.state.recent.forEach(ev => {
                    if ( ev.memberId == m.memberId ) {
                        m.recentTs = - ev.timestamp
                    }
                })
            })
            return _.sortBy( active, 'recentTs')
        },
        loggedIn(){
            return this.$store.getters.isLoggedIn
        },
        perMonth(){
            let fixed = parseFloat(this.$store.state.cash.rent)
            let variable = parseFloat(this.$store.state.cash.variable)
            let numActiveMembers = this.activeMembers.length
            let perMonth = ( fixed + variable ) / numActiveMembers
            return  perMonth.toFixed(2)
        },
        cap(){
            return this.$store.state.cash.cap
        }
    },
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
