import request from 'superagent'
import M from '../mutations'

const state = [] // aka resources (in this file):

const mutations = {
    setCurrent(invoices, current){
        invoices.length = 0
        current.invoices.forEach( invoice => {
            invoices.push(invoice)
        })
    },
    applyEvent: M.invoicesMuts
}

const actions = {}

export default {
  state,
  mutations,
  actions
}
