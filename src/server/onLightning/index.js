
import events from "../events"
import lnd from "./lnd"

console.log('Starting onLightning watching', lnd)

lnd.unlock( (err, r) => {
    const call = lnd.getClient().subscribeInvoices({})
    call.on('data', function(message) {
      console.log('lnd stream', message)
      if (message.settled){
        let rhash = message.r_hash.toString('hex')
        events.invoicesEvs.invoicePaid(rhash)
      }
    })
})



function updateStatus(){
    const lndStatus = {}
    lnd.getClient().getInfo({}, (err, res) => {
        console.log('getInfo', {err, res})
        lndStatus.info = res
        lnd.getClient().walletBalance({}, (err, res) => {
            lndStatus.wallet = res
            lnd.getClient().channelBalance({}, (err, res) => {
                lndStatus.wallet.channels = res
                events.nodesEvs.nodeStatusUpdated('lnd', lndStatus)
            })
        })
    })
}
