import request from 'superagent'
import M from '../mutations'

const state = {
    lnd: {},
    bitcoind: {}
}

const mutations = {
    setCurrent(state, current){
        state.lnd = current.nodes.lnd
        state.bitcoind = current.nodes.bitcoind
    },
    applyEvent: M.nodesMuts
}

const actions = {}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}
