const fs = require('fs')
const lnd = require('./index')
const grpc = require('grpc')
const macaroonFile = fs.readFileSync(lnd.macaroon)
const meta = new grpc.Metadata()
meta.add('macaroon', macaroonFile.toString('hex'))

module.exports = meta
