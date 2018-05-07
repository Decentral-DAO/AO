import events from "../events"
import lnd from "./lnd"

console.log('starting onLightning watching')

lnd.getInfo({}, (err, res) => {
    console.log('getInfo', err, res)
})

// const call = lnd.subscribeInvoices({})
// lnd.on('data', function(message) {
//     console.log('lnd stream', message)
// })
//
// lnd.on('end', function() {
//     // The server has finished sending  console.log("END");
//     console.log("lnd stream ended")
// })
//
// lnd.on('status', function(status) {
//     console.log('lnd status', status)
//     // Process status  console.log("Current status: " + status);
// })
