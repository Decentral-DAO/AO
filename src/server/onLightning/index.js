
import events from "../events"
import lnd from "./lnd"
import { hashblockStream } from '../onChain/bitcoindZmq'

console.log('Starting onLightning watching', lnd)

hashblockStream.onValue( updateStatus )

lnd.unlock( (err, r) => {
    const call = lnd.getClient().subscribeInvoices({})
    updateStatus()
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
        lndStatus.info = res
        lnd.getClient().walletBalance({}, (err, res) => {
            lndStatus.wallet = res
            lnd.getClient().channelBalance({}, (err, res) => {
                lndStatus.wallet.channels = res
                console.log("status update:", lndStatus)
                events.nodesEvs.nodeStatusUpdated('lnd', lndStatus)
            })
        })
    })
}
