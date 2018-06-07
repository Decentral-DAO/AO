import request from 'superagent'
import M from '../mutations'

const state = {
    cash: 0,
    spot: 123456,
    currency: 'CAD',
    rent: 0
}

const mutations = {
    setCurrent(state, current){
        state.cash = current.cash.cash
        state.spot = current.cash.spot
        state.currency = current.cash.currency
        state.rent = current.cash.rent
    },
    applyEvent: M.cashMuts
}

const actions = {}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}
