import config from '../../../configuration'

import fs from 'fs'
import grpc from 'grpc'

process.env.GRPC_SSL_CIPHER_SUITES = 'HIGH+ECDSA'

var m = fs.readFileSync(config.lnd.macaroon)
var macaroon = m.toString('hex')

var metadata = new grpc.Metadata()
metadata.add('macaroon', macaroon)

var macaroonCreds = grpc
    .credentials
    .createFromMetadataGenerator((_args, callback) => {
        callback(null, metadata);
    });

// build ssl credentials using the cert the same as before
var lndCert = fs.readFileSync(config.lnd.cert)

var sslCreds = grpc.credentials.createSsl(lndCert)

// combine the cert credentials and the macaroon auth credentials
// such that every call is properly encrypted and authenticated
var credentials = grpc.credentials.combineChannelCredentials(sslCreds, macaroonCreds)

// Pass the crendentials when creating a channel
var lnrpcDescriptor = grpc.load( __dirname + "/rpc.proto")
var lnrpc = lnrpcDescriptor.lnrpc

var lnd = new lnrpc.Lightning(config.lnd.rpcserver, credentials)

module.exports = lnd
