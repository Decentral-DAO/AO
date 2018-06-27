
let PORT = process.env.PORT || 8003

require('./onChain')
require('./onLightning')

import express from 'express'
import dctrlDb from './dctrlDb'
import path from "path"
import { initializeWatchedMembersAddresses } from './onChain/currentAccounts'
import socketProtector from 'socketio-auth'
import socketIo from 'socket.io'
import state from './state'
import reactions from './reactions'
import applyRouter from './router'
import { socketAuth } from './auth'
import { watchSpot } from './exchangeRate'
import Kefir from 'kefir'
import cronStarter from './crons'

const app = express()
applyRouter(app)
startDctrlAo()

function startDctrlAo(){

  dctrlDb.startDb( (err, conn) => {

    state.initialize( err => {
      if (err) return console.log('state initialize failed:', err)

      console.log('state initialized', state.serverState.joiners)

      watchSpot()
      initializeWatchedMembersAddresses()
      cronStarter()

      const serverReactions = dctrlDb.changeFeed.onValue( ev => {
        state.applyEvent(state.serverState, ev)
      })
      .onValue(reactions)

      const cleanupHeartbeat = Kefir.interval(12345678, {type: 'cleanup'})
      const evStream = Kefir.merge([serverReactions, cleanupHeartbeat])

      const server = app.listen(PORT, err => {
        console.log("Listening on port", PORT)

        const io = socketIo(server)

        socketProtector(io, {
          authenticate: socketAuth,
          // TODO:
          // postAuthenticate:
          // disconnect:
          // timeout:
        })

        const filteredStream = evStream
            .map(state.removeSensitive)
            .onValue( ev => {
              state.applyEvent(state.pubState, ev)
              console.log('emitting event ', ev.type)
              io.emit('eventstream', ev)
            })
      })
    })
  })
}
