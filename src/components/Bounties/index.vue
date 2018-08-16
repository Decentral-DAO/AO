<template lang='pug'>

#tasks
    crazy-btn(v-if='isLoggedIn && !isBounties', to='/BOUNTY_CREATE', text='Propose Bounty')
    shared-title(title='Project & Improvement Bounties')
    .list(v-if='isLoggedIn')
        table
            tbody
                active-tasks(v-for="b in tasks", :b="b")
    .padding(v-else)
        h5 dctrl bounty
        ol
            li Reward for completion.

</template>

<script>

import ActiveTasks from "../Tasks/ActiveTasks"
import request from "superagent"
import SharedTitle from '../slotUtils/SharedTitle'
import CrazyBtn from '../slotUtils/CrazyBtn'
import {calculateTaskPayout} from '../../calculations'

export default {
  computed: {
      tasks(){
          let tasks = this.$store.state.tasks.filter(t => {
              return t.oneTime
          })
          return tasks.sort( (first, second) => {
              let f = calculateTaskPayout(first)
              let s = calculateTaskPayout(second)
              return f < s
          })
      },
      isLoggedIn(){
          return this.$store.getters.isLoggedIn
      }
  },
  components:{
      SharedTitle,
      ActiveTasks,
      CrazyBtn
  },
}

</script>

<style lang="stylus" scoped>

@import '../../styles/colours'

#tasks
    width: 100%

tr
    border-color: accent4
    border-top-style: solid
    border-bottom-style: solid
    border-width: 3px
    vertical-align:middle

thead
    tr
        text-align: center

td
    vertical-align: middle
    color: accent2
    font-size: 1.34em
    text-align: center

li
    text-align: left


img
    height: 3.9em

table
    text-align:center
    width: 100%
th
    font-family: sans-serif
    font-weight: lighter
    font-size: 1.1em
    color: accent1
    border-color: accent1

td
    color: accent3

.padding
    padding: 1.987654321em

li
    margin-left: 1em

</style>
