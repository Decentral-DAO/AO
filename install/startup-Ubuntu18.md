TODO - Simplify and summarize how to use systemd

---
### 3. Setup the database service
We need to create a directory for the rethinkdb data. I suggest following the convention of .bitcoind and .lnd :
- `rethinkdb create -d .rethinkdb`

We also need to create a config file,
- https://github.com/rethinkdb/rethinkdb/blob/next/packaging/assets/config/default.conf.sample
- `touch .rethinkdb/rethinkdb.conf`

Now that rethink is ready we can create a systemd service file `touch /etc/systemd/system/rethinkdb.service`. Edit the file with this replacing the user name with yours.
```text
[Unit]
Description=rethinkdb-deamon

[Service]
User=<user-name>
ExecStart=/usr/local/bin/rethinkdb serve --config-file /home/<user-name>/.rethinkdb/rethinkdb.conf --directory /home/<user-name>/.rethinkdb
Restart=always
KillMode=process
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```
Enable
  - `systemctl daemon-reload`
  - `systemctl enable rethinkdb.service`
  - `systemctl start rethinkdb.service`
  - Just useful to know:
  - `systemctl status rethinkdb.service` # see status
  - `journalctl -u rethinkdb.service` # see logs

To confirm check the admin console at `localhost:8080` is still on after a reboot.

---
### 4. Setup the bitcoin node
First get the bitcoin binaries from https://bitcoin.org/en/download and unpack them

- `cd Downloads`
- `tar xf bitcoin-0.16.0-x86_64-linux-gnu.tar.gz`

Now you can setup another service file `touch /etc/systemd/system/bitcoin.service`

```text
# It is not recommended to modify this file in-place, because it will
# be overwritten during package upgrades. If you want to add further
# options or overwrite existing ones then use
# $ systemctl edit bitcoind.service
# See "man systemd.service" for details.

# Note that almost all daemon options could be specified in
# /etc/bitcoin/bitcoin.conf

[Unit]
Description=bitcoin-deamon
After=network.target

[Service]
ExecStart=/home/trhode/Downloads/bitcoin-0.16.0/bin/bitcoind -daemon -conf=/home/trhode/.bitcoin/bitcoin.conf -pid=/run/bitcoind/bitcoind.pid
# Creates /run/bitcoind owned by bitcoin
RuntimeDirectory=bitcoind
User=trhode
Type=forking
PIDFile=/run/bitcoind/bitcoind.pid
Restart=on-failure
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```
We need a configuration file as well `touch ~/.bitcoin/bitcoin.conf`.

```text
txindex=1
server=1
daemon=1
testnet=1

rpcuser=bitcoinrpc
rpcpassword=<your-Good-Secret>b7p5y4EpBsdfDSvcarw7udgXsAce

zmqpubhashtx=tcp://127.0.0.1:28332
zmqpubhashblock=tcp://127.0.0.1:28332
zmqpubrawblock=tcp://127.0.0.1:28332
zmqpubrawtx=tcp://127.0.0.1:28332

```
Now enable
- `systemctl daemon-reload`
- `systemctl enable bitcoind.service`
- `systemctl start bitcoind.service`

You can check the status of bitcoind using:
- `bitcoin-cli getnetworkinfo`
- `bitcoin-cli getblockchaininfo`
- `bitcoin-cli help`

Confirm that these command survive a reboot. It will take some time to sync the node.

---
### 6. Install go and lightning node
Go is needed to run lnd
- `sudo apt-get install golang-1.10-go`

It should install the binaries to /usr/lib/go-1.10/bin. We need to add that path to our binaries to use go from the command line. We also need to configure the go path. Create a go directory in your home director `mkdir go`. And add the following text to the `~/.profile` bash profile file.

```text
export PATH=$PATH:/usr/lib/go-1.10/bin
export GOPATH=~/go
export PATH=$PATH:$GOPATH/bin
```

Next we will install lnd. More up to date instructions may be found here (https://github.com/lightningnetwork/lnd/blob/master/docs/INSTALL.md).

```bash
go get -d github.com/lightningnetwork/lnd
cd $GOPATH/src/github.com/lightningnetwork/lnd
make && make install
```
---

### 7. Install node.js
Easiest way is to use nvm:
- `wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash`
Then you need to close and re-open the terminal, then you can install the most recent node.
- `nvm install stable`
---

### 8. Install yarn
Yarn, package manager for nodejs (https://yarnpkg.com/en/docs/install)
- `curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -`
- `echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list`
- `sudo apt-get update`
- `sudo apt-get install --no-install-recommends yarn` #
---

### 9. Install ao

Get the code from github and install the dependencies:
- `git clone https://github.com/dctrl-ao/ao.git`
- `cd ao`
- `yarn build`

At this point you will should be ready to run the app in dev mode. Try `yarn serve` to startup the vue hot-reloading. In this mode any changes you make to the /src/ folder will be immeadiately displayed. This is useful while editing the frontend components or templating new functionality.

Before you run the production server you need to setup a configuration.js file in the root of the project. An example configuration file can be found at /setupSamples/configurationSAMPLE.js. Now you can run `yarn compile` to build and start the app.

On first start it should create a rethinkdb database called 'dctrl' and a table on it called 'events'. This is where all of the data of the app will be stored, in a single table of events. An initial member (dctrl) will be created with password 1235 that can be used for initial auth into the app.

To recap the dctrl-ao scripts are:
- `yarn buildFront` # compile the vue code to /dist
- `yarn buildBack` # compile the server code to /production
- `yarn serve` # hot reloading + dev-tools (https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
- `yarn start` # eventstate server & web app, hosted at http://localhost:8003
- `yarn compile` # yarn buildFront && yarn buildBack && yarn start

You should now be able to navigate to localhost:8003 to find the ao admin console. Log in as the first user (dctrl:1235).

---
### 9.1 Setup ao as a service

Create another service file. An example service file can be found at setupSamples/ao.service. You can copy it into /etc/systemd/system/ao.service. You need to update the example so the path to the code executable and the /ao/production/server/app.js is correct. Once you do that you can run:

- `systemctl daemon-reload`
- `systemctl start ao.service` # this should start it, check that it works
- `systemctl enable ao.service` # this should start it on boot, check that it works by restarting
---

### 12. Connect rfid scanning Pi's
See the setup instructions at (https://github.com/dctrl-ao/fobtap)
### - Host on cjdns / meshnet
### - Host on the internet
### - Run IPFS client
### - Run Matrix chat server
### - ???
