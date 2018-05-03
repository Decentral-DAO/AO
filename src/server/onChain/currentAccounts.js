const request = require('superagent')
const config = require('../../../configuration')
const state = require('../state')
const bitcoindRpc = require('./bitcoindRpc')

const currentAccounts = []

function initializeWatchedMembersAddresses(){
    state.pubState.members.forEach( member => {
        checkInitial(member.address, 'member')
    })
}

function checkInitial(address, group){
    if (!address) return console.log('address required')

    bitcoindRpc.importAddress(address, (err)=> {

        bitcoindRpc.getBalance(address, (err, balance)=> {
            if (err) return console.log('getbalance err:', err);

            currentAccounts.push({
                address,
                balance,
                group
            })
        })
    })
}

module.exports = {currentAccounts, initializeWatchedMembersAddresses, checkInitial}
