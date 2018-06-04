
import events from "../events"
import lnd from "./lnd"

// const lnd = getLnd()
console.log('Starting onLightning watching', lnd)

lnd.getInfo({}, (err, res) => {
    console.log('getInfo', err, res)
})

const call = lnd.subscribeInvoices({})

call.on('data', function(message) {
    console.log('lnd stream', message)
    if (message.settled){
        events.invoicesEvs.invoicePaid(message.r_hash.toString('hex'), console.log)
    }
})






// example stream
// lnd stream { memo: '',
//   receipt: <Buffer >,
//   r_preimage: <Buffer 56 2c 44 bc 33 63 c7 20 8d ee 2d 52 77 0a 0e 2b c5 12 e0 59 97 61 d4 5c 32 fb 98 75 b2 31 89 c1>,
//   r_hash: <Buffer da 7b 23 14 48 9f d0 4c 4e 8a 5b 59 38 01 42 bd c9 77 bc 76 79 75 87 aa 23 ed a8 6a dd 3d c8 d7>,
//   value: '1234',
//   settled: true,
//   creation_date: '1526241120',
//   settle_date: '1526241158',
//   payment_request: 'lnbcrt12340n1pd039mqpp5mfajx9zgnlgycn52tdvnsq2zhhyh00rk096c023rak5x4hfaertsdqqcqzyss75hv94nqr7820jdedrh6m9pl6twjrh9anu2lgykv7rvdxhhd6pnev5c7u45mvsufaxqmdep6h5q7het27s4rsm3c84k9qrep60gdwsqwz8vp6',
//   description_hash: <Buffer >,
//   expiry: '3600',
//   fallback_addr: '',
//   cltv_expiry: '144',
//   route_hints: [],
//   private: false }


// // //
// call.on('end', function() {
//     // The server has finished sending  console.log("END");
//     console.log("lnd stream ended")
// })
//
// //
// call.on('status', function(status) {
//     console.log('lnd status', status)
//     // Process status  console.log("Current status: " + status);
// })
