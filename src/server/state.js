import _ from 'lodash'
import dctrlDb from './dctrlDb'
import M from '../mutations'

const serverState = {
  recent: [],
  invoices: [],
  sessions: [],
  members: [],
  tasks: [],
  resources: [],
  joiners: [],
  cash: {
    currency: 'CAD',
    cash: 0,
    spot: 0,
    rent: 0,
    variable: 0,
    cap: 75,
  },
  nodes: {
    bitcoind: {},
    lnd: {}
  },
}

const pubState = {
  recent: [],
  invoices: [],
  sessions: [],
  members: [],
  tasks: [],
  resources: [],
  joiners: [],
  cash: {
    currency: 'CAD',
    cash: 0,
    spot: 0,
    rent: 0,
    variable: 0,
    cap: 75,
  },
  nodes: {
      bitcoind: {},
      lnd: {}
  },
}

function applyEvent(state, ev) {
    M.recentMuts(state.recent, ev)
    M.cashMuts(state.cash, ev)
    M.invoicesMuts(state.invoices, ev)
    M.membersMuts(state.members, ev)
    M.resourcesMuts(state.resources, ev)
    M.sessionsMuts(state.sessions, ev)
    M.tasksMuts(state.tasks, ev)
    M.joinersMuts(state.joiners, ev)
    M.nodesMuts(state.nodes, ev)
}

function initialize(callback) {
    dctrlDb.getAll((err, all) => {
        if (err) return callback(err)
        all.forEach( ev => {
            applyEvent(serverState, ev)
            applyEvent(pubState, removeSensitive(ev))
        })

        applyEvent(serverState, {type: 'cleanup'})
        applyEvent(pubState, {type: 'cleanup'})

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
