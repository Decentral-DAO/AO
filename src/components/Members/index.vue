<template lang='pug'>

#member
    crazy-btn(v-if='loggedIn' to='/member_create' text='new member')
    shared-title(title='Illuminati Hit List')
    .list(v-if="loggedIn")
        tab
            row(v-for="m in members", :m="m", v-if='m.active > 0')
        .purg
            template(v-for="m in members", v-if='m.active <= 0')
                .bouncy {{ m.name }}
                    dctrl-active(m="m")
    .padding(v-else)
        h5 dctrl member
        ol
            li Believer in a transcendent future.
            li Possess dctrl rfid tag.
            li Possible human, magical entity, fairy, cyborg or alien.
        p
            strong visit a node to find out more

</template>

<script>

import Row from "./Row"
import request from "superagent"
import SharedTitle from '../slotUtils/SharedTitle'
import Tab from './Tab'
import CrazyBtn from '../slotUtils/CrazyBtn'
import DctrlActive from './DctrlActive'

export default {
    computed: {
        loggedIn(){
            return this.$store.getters.isLoggedIn
        },
        members(){
            return this.$store.state.members
        }
    },
    components:{
        SharedTitle,
        Row,
        Tab,
        CrazyBtn,
        DctrlActive
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
