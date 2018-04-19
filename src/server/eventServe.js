import express from 'express'
import r from 'rethinkdb'

import state from './state'
import dctrlDb from './dctrlDb'

const router = express.Router()

router.post('/evdb', (req, res, next) => {
    console.log('inside the event serving middleware. filter:', req.body)
    r
        .table('events')
        .orderBy('timestamp') //todo index
        .filter(req.body)
        .run(dctrlDb.getConn(), (err, cursor) => evdbRespond(err, cursor, res))
})

router.post('/evdb/recent', (req, res, next) => {
    console.log('inside the recent event serving middleware:', req.body)
    r
        .table('events')
        .orderBy('timestamp') //todo index
        .filter({
            // timestamp:  TODO r.gt
        })
        .run(dctrlDb.getConn(), (err, cursor) => evdbRespond(err, cursor, res))
})

function evdbRespond(err, cursor, res){
    if (err) return res.end("db error, panic")
    let all = []
    cursor.each((err, ev) => {
      if (err) return console.log('err getting event', err)
      all.push( state.removeSensitive(ev) )
    }, (err) => {
        res.send(all)
    })
}

module.exports = router
