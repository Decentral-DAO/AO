import _ from 'lodash'
import dctrlDb from './dctrlDb'
import M from '../mutations'

const serverState = {
  invoices: [],
  sessions: [],
  members: [],
  tasks: [],
  resources: [],
  cash: {
    currency: 'CAD',
    cash: 0,
    spot: 0
  },
}

const pubState = {
  invoices: [],
  sessions: [],
  members: [],
  tasks: [],
  resources: [],
  cash: {
    currency: 'CAD',
    cash: 0,
    spot: 0
  },
}

function applyEvent(state, ev) {
    M.cashMuts(state.cash, ev)
    M.invoicesMuts(state.invoices, ev)
    M.membersMuts(state.members, ev)
    M.resourcesMuts(state.resources, ev)
    M.sessionsMuts(state.sessions, ev)
    M.tasksMuts(state.tasks, ev)
}

function initialize(callback) {
    dctrlDb.getAll((err, all) => {
        if (err) return callback(err)
        all.forEach( ev => {
            applyEvent(serverState, ev)
            applyEvent(pubState, removeSensitive(ev))
        })
        callback(null)
    })
}

function removeSensitive(ev){
      return _.omit(ev, ['fob', 'secret', 'token', 'email'])
}

module.exports = {
    serverState,
    pubState,
    initialize,
    applyEvent,
    removeSensitive,
}
