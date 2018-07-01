
O


# Regtest

The configuration files are set to use (not testnet, not mainnet but) regtest mode. Regtest is a local test blockchain that you have full control over.

You need to start bitcoind in one terminal.

- `cd Downloads/bitcoin-0.16.1/bin/`
- `./bitcoind`

Then from another terminal using bitcoin-cli you can generate blocks whenever you need (i.e. open payment channel).

- `cd Downloads/bitcoin-0.16.1/bin/`
- `./bitcoin-cli generate 101`
- `./bitcoin-cli generatetoaddress 50 1Ross5Np5doy4ajF9iGXzgKaC2Q3Pwwxv`

We generated 101 blocks because a coinbase transactions (new coins) are not spendable until 100 blocks deep.

### Local Lightning Cluster
