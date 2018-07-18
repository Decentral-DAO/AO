const request = require('superagent')
const config = require('../../../configuration')
const state = require('../state')
const bitcoindRpc = require('./bitcoindRpc')

const currentAccounts = []

// on startup, fills current account list to be checked
function initializeWatchedMembersAddresses(){
    state.pubState.members.forEach( (member, i) => {
        addAddressToAccount(member.address, member.memberId, (err, res)=> {
          setTimeout(()=>{
              checkInitial(member.memberId)
          }, 321 * i)
        })
    })
}

function addAddressToAccount(address, account, callback) {
    bitcoindRpc.importAddress(address, account, callback)
}

function checkInitial(account){
    bitcoindRpc.getAccountBalance(account, (err, balance)=> {
        if (err) return console.log('getbalance err:', err);
        currentAccounts.push({
            account,
            balance
        })
    })
}

module.exports = {currentAccounts, initializeWatchedMembersAddresses, addAddressToAccount, checkInitial}
