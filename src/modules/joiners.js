import request from 'superagent'
import M from '../mutations'

const state = []
const mutations = {
    setCurrent(joiners, current){
        joiners.length = 0 // empties
        current.joiners.forEach( j => {
            joiners.push(j)
        })
    },
    applyEvent: M.joinersMuts
}

const actions = {}

export default {
  state,
  mutations,
  actions,
}
