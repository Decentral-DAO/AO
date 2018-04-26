// sample configuration.js, production configuration.js should be in root folder of ao
module.exports = {
    rethink: {
        host: 'localhost',
        port: 28016,
        db:'dctrl',
    },
    bitcoind:{
        username:'bitcoinrpc',
        password:'',
        network: 'testnet'
    },
    bitcoinAverage: {
        pub: '',
        secret: ''
    }
}
