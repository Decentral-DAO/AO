
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

Use terminal windows to open two lightning nodes for Alice and Bob and connect them. First make a data directory for each:

- `mkdir ~/.lnd/alice`
- `mkdir ~/.lnd/bob`

These directories are going to hold the data, the logs, and the security credentials for each ln-node. Within the alice directory we will run.
- `lnd --rpclisten=localhost:10001 --listen=localhost:10011 --restlisten=localhost:8001`

Within the bob directory run:
- `lnd --rpclisten=localhost:10002 --listen=localhost:10012 --restlisten=localhost:8002`

Then from the alice directory we can create a wallet.
- `lncli --rpcserver=localhost:10001 create`
- `lncli --rpcserver=localhost:10001 getinfo` # see the details, most importantly the identity_pubkey
- `lncli-alice newaddress np2wkh` # after adding alias - create an address

We can reduce typing by adding the following to ~/.bashrc. From now on if we use the lncli-alice command it is assumed we are in the alice directory and same for lncli-bob.
```
# Note alias used within the alice / bob directory
alias lncli-alice="lncli --rpcserver=localhost:10001 --macaroonpath=data/admin.macaroon"
alias lncli-bob="lncli --rpcserver=localhost:10002 --macaroonpath=data/admin.macaroon"
```

Now that we have two nodes started up we can connect them together. We set the --listen flag for both alice and bob. That is the port they are respectively listening to for p2p connections. To peer alice with bob do:

- `lncli-bob getinfo` # this will print the info for bob: we need the identity_pubkey
- `lncli-alice connect <BOB_PUBKEY>@localhost:10012`

Before we can open a channel we need to fund the lnd wallets. Use lnd to get an address, then either generate blocks to that address or send directly from bitcoind.

- `lncli-alice newaddress np2wkh`
- `bitcoin-cli sendtoaddress <address^^> 1`
- `bitcoin-cli generate 7`
- `lncli-alice openchannel --node_key=<BOB_PUBKEY> --local_amt=1000000`
- `bitcoin-cli generate 7`

We need to generate blocks in order to confirm the funding and opening transactions. Now that we have one channel open that is enough to test ao. We will connect ao to bob and be able to pay the lightning invoices using alice-cli. We will also be able to test if ao's on chain watching is working.

Make sure the following processes are running (each in there own terminal at this point):
- rethinkdb
- bitcoind
- lnd (alice and bob)

Then start ao from /ao/ -- `yarn compile`. It should build, initialize the database and add the first member name - dctrl, password - 1235. You should now be able to visit localhost:8080 to see rethinkdb admin console. You should have a database called dctrl with one table (events). localhost:8003 should be your local version of ao. After logging in you can create new members. New members will have an address associated (in bob's wallet).

- `bitcoin-cli sendtoaddress <address^^> 1`
- `bitcoin-cli generate 7`

It should update member account on the ui. You can also test the lightning payments on the My Page tab. Use the lightning button to generate a payment request. The below command should settle the request and update the members account.

- `lncli-alice payinvoice <pay-req>`

Now that the ao server is running you can connect a raspberry pi which is used to control door / vending machine / ... /fobtap/install.md . Resources that have been assigned a charged amount can be triggered with lightning payments (in the resources tab). 
