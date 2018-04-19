import events from "./events"
import lnd from "./lnd"

const call = lnc.subscribeInvoices({})

call.on('data', function(message) {
    console.log('lnd stream', message)
})

call.on('end', function() {
    // The server has finished sending  console.log("END");
    console.log("lnd stream ended")
})

call.on('status', function(status) {
    console.log('lnd status', status)
    // Process status  console.log("Current status: " + status);
})
