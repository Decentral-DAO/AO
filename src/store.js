import _ from 'lodash'
import Vue from 'vue'
import Vuex from 'vuex'

// state
import cash from './modules/cash'
import members from './modules/members'
import tasks from './modules/tasks'
import resources from './modules/resources'
import sessions from './modules/sessions'
import invoices from './modules/invoices'
import joiners from './modules/joiners'
import nodes from './modules/nodes'

// client side
import events from './modules/events'
import eventstream from './modules/eventstream'
import loader from './modules/loader'

import recent from './modules/recent'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
      loader, members, tasks,
      resources, cash, events,
      eventstream, sessions,
      invoices, recent, joiners, nodes
  },
  getters: {
      mrclean(state, getters){
          let time = 0
          let who = ''
          state.tasks.forEach(task => {
              if (task.lastClaimed > time){
                  time = task.lastClaimed
                  who = task.lastClaimedBy
              }
          })
          console.log('mrclean:', {who})
          return who
      },
      memberId(state, getters){
          let id
          state.sessions.forEach( s => {
              if (s.session === state.loader.session){
                  id = s.ownerId
              }
          })
          return id
      },
      isAdmin(state, getters){
          let isAdmin
          getters.member.badges.forEach( b => {
              if (b === 'admin'){
                  isAdmin = true
              }
          })
          return isAdmin
      },
      isLoggedIn(state, getters){
          let isLoggedIn = !!getters.memberId
          return isLoggedIn
      },
      member(state, getters){
          let loggedInMember = {}
          state.members.forEach(member => {
              if( getters.memberId === member.memberId){
                  _.assign(loggedInMember, member)
              }
          })
          return loggedInMember
      },
  },
  middlewares: [],
  strict: process.env.NODE_ENV !== 'production'
})
