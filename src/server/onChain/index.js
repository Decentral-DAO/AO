import config from '../../../configuration'
import request from 'superagent'
import events from '../events'
import state from '../state'
import bitcoindZmq from './bitcoindZmq'
import bitcoindRpc from './bitcoindRpc'
import { currentAccounts } from './currentAccounts'

// check on new blocks
bitcoindZmq.hashblockStream
    .log('block found')
    .onValue(checkForPayments)

function checkForPayments(){
    console.log("CHECKING FOR PAYMENTS.")
    currentAccounts.forEach( watched => {
        bitcoindRpc.getAccountBalance(watched.account, (err, balance)=> {
            if (err) return console.log('getAccountBalance err:', {err})

            if (watched.balance !== balance){
                let amount = parseFloat(balance) - parseFloat(watched.balance)
                watched.balance = balance
                recordMemberPayment(amount, watched.account)
            } else {
                console.log('no payment received', watched)
            }
        })
    })
}

function recordMemberPayment(btcAmount, account){
    let memberId = account
    let paid = (state.pubState.cash.spot * btcAmount).toFixed(6).toString()
    let isCash = false
    let notes = 'dctrl-admin' // txid ?
    console.log({memberId, paid})
    if (memberId && paid){
        events.membersEvs.memberPaid(memberId, paid, isCash, notes)
    }
}
