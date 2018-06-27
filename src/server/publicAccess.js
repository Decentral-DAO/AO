import express from 'express'
import r from 'rethinkdb'

import state from './state'
import dctrlDb from './dctrlDb'
import events from './events'

const router = express.Router()

// Should have some spam protections

router.get('/join/:name',(req, res) => {
    // TODO // paywall //
    console.log('joiners name: ', req.params)
    events.joinersEvs.joinerCreated(req.params.name, (err, r) => {
        console.log({err, r})
        res.send({
            i: {}, // TODO: payreq for joiner creation?
        })

    })
})

module.exports = router
