import request from 'superagent'
import M from '../mutations'

const state = [] // aka resources (in this file):

const mutations = {
    setCurrent(sessions, current){
        sessions.length = 0
        current.sessions.forEach( session => {
            sessions.push(session)
        })
    },
    applyEvent: M.sessionsMuts
}

const actions = {}

export default {
  state,
  mutations,
  actions
}
