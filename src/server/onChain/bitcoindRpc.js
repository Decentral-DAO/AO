const Client = require('bitcoin-core')
const config = require('../../../configuration')

const client = new Client(config.bitcoind)

function importAddress(address, account, callback){
    console.log({address})
    client.command(
        'importaddress',
        address,
        account,
        false,
        (err) => {
            callback(err)
        }
    )
}


function getAccountBalance(account, callback) {
   client.command(
       'getreceivedbyaccount',
       account,
       (err, balance, resHeaders)=>{
           if (err) return callback(err);
           callback(null, balance)
       }
   )
}

function listAccountTransactions(account, callback){
    client.command(
        'listtransactions',
        account,
        99, // max tx
        0, // skip
        true, // use watch only
        (err, transcations, resHeaders)=>{
            if (err) return callback(err);
            console.log('listAccountTransactions', {err, transcations, resHeaders})
            callback(null, transcations)
        }
    )
}

function getBalance(address, callback){
    client.command(
        'getreceivedbyaddress',
        address,
        (err, balance, resHeaders)=>{
            if (err) return callback(err);
            callback(null, balance)
        }
    )
}

function getAddressHistory(address, callback){
    client.listTransactions((err, tranactions)=>{
        if (err) return console.log({err})
        let matchedTxs = tranactions.filter( tx => {
            return tx.address == address
        })
        callback(null, matchedTxs)
    })
}

module.exports = {
    getBalance,
    importAddress,
    getAddressHistory,
    getAccountBalance,
    listAccountTransactions,
}
