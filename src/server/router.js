import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import state from './state'
import spec from './spec'
import fobtap from './fobtap'
import eventServe from './eventServe'
import { serverAuth } from './auth'

module.exports = function applyRouter(app){

    app.use(express.static(path.join(__dirname, '../../dist')))
    app.use(express.static(path.join(__dirname, '../../public')))

    app.get('/*', function(req, res) {
        res.sendFile(path.join(__dirname, '../../dist/index.html'))
    })

    app.use(serverAuth)

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({
        extended: true
    }))

    app.use(spec)   // handles event creation
    app.use(fobtap) // handles rfid scan devices
    app.use(eventServe) // serves history

    app.post('/state', (req, res) => {
        res.json(state.pubState)
    })
}
