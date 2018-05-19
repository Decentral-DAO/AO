
import fs from 'fs'
import grpc from 'grpc'

process.env.GRPC_SSL_CIPHER_SUITES = 'HIGH+ECDSA'

// Lnd admin macaroon is at ~/.lnd/admin.macaroon on Linux and
// ~/Library/Application Support/Lnd/admin.macaroon on Mac
var m = fs.readFileSync('/home/trhode/learn/lightning/regAlice/data/admin.macaroon')
var macaroon = m.toString('hex')
var metadata = new grpc.Metadata()

metadata.add('macaroon', macaroon)
var macaroonCreds = grpc.credentials.createFromMetadataGenerator((_args, callback) => {
    callback(null, metadata);
});

// build ssl credentials using the cert the same as before
var lndCert = fs.readFileSync("/home/trhode/.lnd/tls.cert")
var sslCreds = grpc.credentials.createSsl(lndCert)

// combine the cert credentials and the macaroon auth credentials
// such that every call is properly encrypted and authenticated
var credentials = grpc.credentials.combineChannelCredentials(sslCreds, macaroonCreds)

// Pass the crendentials when creating a channel
var lnrpcDescriptor = grpc.load(__dirname + "/rpc.proto")
var lnrpc = lnrpcDescriptor.lnrpc

console.log('creating lnd object with creds', credentials)

var lnd = new lnrpc.Lightning('localhost:10003', credentials)

module.exports = lnd
