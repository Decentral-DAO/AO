const fs = require('fs')
const lndConfig = require('./index')
const grpc = require('grpc')
const macaroonFile = fs.readFileSync(lndConfig.macaroon)
const meta = new grpc.Metadata()
meta.add('macaroon', macaroonFile.toString('hex'))

module.exports = meta
