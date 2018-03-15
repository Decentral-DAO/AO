import r from 'rethinkdb'
import Kefir from 'kefir'
import config from '../configuration'
import cryptoUtils from '../src/crypto'
import _ from 'lodash'

var conn, eventEmitter

const changeFeed = Kefir.stream(e => {
  eventEmitter = e
}).log('dbfeed')

function initializeRethink(cb) {
  if (!conn) return console.log("wait for connection")
  return r.dbCreate('dctrl').run(conn, (err, result) => {
    r.db('dctrl').tableCreate('events').run(conn, (err2, result2) => {

      insertEvent({
        type: 'member-created',
        name: 'dctrl',
        fob: '0000000000',
        secret: cryptoUtils.createHash('1235'), // password for dctrl init user is 1235
        memberId: '0',
        address: '2MyY5mgC8Nf3k3mdUK6tGKQhCUFLKXuFZVk',
        active: 1,
        balance: 0,
        badges: [],
        info: {}
      })
      cb(null, conn)
      // startFeed()
    })
  })
}

function getAll(callback) {
    if (!conn) return console.log("wait for connection")
    r
        .db('dctrl')
        .table('events')
        .orderBy('timestamp') //todo index
        .run(conn, (err, cursor) => {
            if (err) return console.log('err getting feed', err)
            let all = []
            cursor.each((err, ev) => {
              if (err) return console.log('err getting event', err)
              all.push(ev)
            }, (err, res) => {
              callback(null, all)
            })
        })
}

function startFeed() {
  console.log("starting feed...")
  r
    .db('dctrl')
    .table('events')
    .changes()
    .run(conn, (err, cursor) => {
      if (err) return console.log('err getting feed', err)
      cursor.each((err, ev) => {
        if (err) return console.log('err getting event', err)
        eventEmitter.emit(ev.new_val)
      })
    })
}

function insertEvent(ev, callback) {
  if (!conn) return callback("No rethinkdb connection")
  if (!ev.timestamp) {
    ev.timestamp = Date.now()
  }
  r
    .db("dctrl")
    .table("events")
    .insert(ev)
    .run(conn, callback)
}

function startDb(callback){
  r.connect(config.rethink).then(rethinkDbConnection => {
    conn = rethinkDbConnection // conn is global to this file
    console.log("db connected")
    r.dbList().run(conn, (err, list) => {
      if (_.includes(list, 'dctrl')) { // TODO check for table too
        startFeed()
        callback(null, conn)
      } else {
        initializeRethink(callback)
      }
    })
  })
}

function getConn(){
    return conn
}

module.exports = {
  conn:conn,
  startDb,
  getAll,
  changeFeed,
  insertEvent,
  getConn
}
