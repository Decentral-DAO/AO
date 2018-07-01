const Client = require('bitcoin-core')
const config = require('../../../configuration')

const client = new Client(config.bitcoind)


console.log({client})

function importAddress(address, callback){
    console.log({address})
    client.command(
        'importaddress',
        address,
        'test',
        false,
        (err)=>{
            callback(err)
        }
    )
}

function getBalance(address, callback){
    console.log({address})
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
    getAddressHistory
}
