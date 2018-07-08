import dctrlDb from '../dctrlDb'
import lnd from '../onLightning/lnd.js'

import {serverState} from '../state'
import {satsToCad} from '../../calculations'

function invoiceCreated(ownerId, memo, sats, callback) {
    lnd.getClient().addInvoice({
        memo,
        value: sats
    }, (err, response) => {
        if (err) {
            console.log("add Invoice error", err)
            callback(err);
        } else {
          let newEvent = {
              type: "invoice-created",
              ownerId,
              r_hash: response.r_hash.toString('hex'),
              payment_request: response.payment_request,
              memo,
              sats,
          }
          dctrlDb.insertEvent(newEvent, callback)
        }
    })
}

function invoicePaid(r_hash, callback){
    let newEvent = {
        type: "invoice-paid",
        r_hash,
    }
    serverState.invoices.forEach( invoice => {

        if (invoice.r_hash == r_hash){
            console.log('invoice paid matched')
            newEvent.amount = satsToCad(invoice.sats, serverState.cash.spot)

            serverState.resources.forEach( r => {
                if (r.resourceId == invoice.ownerId){
                    newEvent.resourceId = r.resourceId
                }
            })

            serverState.members.forEach( m => {
                if (m.memberId == invoice.ownerId){
                    newEvent.memberId = m.memberId
                }
            })
            dctrlDb.insertEvent(newEvent, callback)
        }
    })
}


export default {
    invoiceCreated,
    invoicePaid
}
