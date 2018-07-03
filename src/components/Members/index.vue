<template lang='pug'>

#member
    crazy-btn(v-if='loggedIn', to='/member_create', text='new member')
    shared-title(title='Illuminati Hit List')
    .list(v-if="loggedIn")
        p Currently there are {{ activeMembers.length }} sharing this dctrl commons node. Cost per month is ${{ perMonth }} each.
        joiners
        row(v-for="m in activeMembers", :m="m")
        .purg
            template(v-for="m in inactiveMembers")
                .bouncy {{ m.name }}
                    dctrl-active(m="m")
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

export default {
    computed: {
        activeMembers(){
            // place members with recent events at top of list
            let active = this.$store.state.members.filter(m => m.active > 0)
            let withRecent = active.map( (m, i) => {
                this.$store.state.recent.forEach(ev => {
                    if ( ev.memberId == m.memberId ) {
                        m.recentTs = - ev.timestamp
                    }
                })
            })
            return _.sortBy( active, 'recentTs')
        },
        inactiveMembers(){
            return this.$store.state.members.filter(m => m.active <= 0)
        },
        loggedIn(){
            return this.$store.getters.isLoggedIn
        },
        perMonth(){
            let perMonth = parseFloat( this.$store.state.cash.rent ) / this.activeMembers.length
            return  perMonth.toFixed(2)
        }
    },
    components:{
        SharedTitle,
        Row,
        CrazyBtn,
        DctrlActive,
        Joiners
    }
}

</script>

<style lang='stylus' scoped>

@import '../../styles/colours'

label
    margin-top: 2em
    font-size: 1.4em
    border-bottom-style: solid
    border-left-style: solid
    border-color: accent2
    margin-bottom: -1px
    background: accent2
    color: main

#member
    width: 100%

li
    margin-left: 1em

.padding
    padding: 1.987654321em

.purg
    width: 100%
    position: relative;
    overflow: hidden;

.bouncy
    position: relative;
    animation: moveX 3s linear 0.5s infinite alternate,
      moveY 0.5s linear 1s infinite alternate;

@keyframes moveX {
  from { left: 0; } to { left: 400px }
}

@keyframes moveY {
  from { top: 0; } to { top: 10px; }
}


</style>
