
import events from "../events"
import lnd from "./lnd"

console.log('Starting onLightning watching', lnd)

lnd.unlock( (err, r) => {

    lnd.getClient().getInfo({}, (err, res) => {
      console.log('getInfo', err, res)
    })

    const call = lnd.getClient().subscribeInvoices({})

    call.on('data', function(message) {
      console.log('lnd stream', message)
      if (message.settled){
        events.invoicesEvs.invoicePaid(message.r_hash.toString('hex'), console.log)
      }
    })

})
