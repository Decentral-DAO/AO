# server install instructions


These instructions will assume you are setting up dctrl/ao on a fresh install of
- Ubuntu 17.10 - https://www.ubuntu.com/download/desktop
### 1. Get ubuntu

To create a bootable Ubuntu usb (on linux) download the .iso file from the above link. Run the command `sudo fdisk -l` to see a list of the the plugged in drives. Once you have selected the correct drive (ie. /dev/sdb) run: The dd command specifies an input file (if) which is the iso and an output file (of) which is the usd drive. Careful this formats the usb!
- `sudo unmount <path-to-usb>`
- `sudo dd if=<path-to-ubuntu-iso> of=<path-to-usb> bs=1M`
- i.e. `sudo dd if=./Downloads/Ubuntu-17.10.iso> of=/dev/sdb bs=1M`


This should create a bootable usb and you can then go through the ubuntu install process by interupting the computers boot up with `delete` or `f10`.

---
### 2. Get the database

Now that we have an operating system, the first thing we need is a database to store and persist our applications state. Our database of choice is rethinkdb. We are following the instructions from https://www.rethinkdb.com/docs/build/ with some modifications for 17.10 -->
- first download and unpack the source;
  - `cd Downloads`
  - `wget https://download.rethinkdb.com/dist/rethinkdb-2.3.6.tgz`
  - `tar xf rethinkdb-2.3.6.tgz`
- Now there should be a rethinkdb folder:
  - `cd rethinkdb-2.3.6`
- Now we can build, these commands take some time
  - ```sudo apt install build-essential protobuf-compiler python libprotobuf-dev libcurl4-openssl-dev libboost-all-dev libncurses5-dev libjemalloc-dev wget m4 clang libssl-dev```
  - `./configure --allow-fetch CXX=clang++`
  - `make`
  - `sudo make install`

After doing the above commands you should have rethinkdb installed. Use the command `which rethinkdb`. If installed correctly the path to the executable file (in my case /usr/local/bin/rethinkdb) will be printed. Now that we have rethinkdb installed we want to set it up so it runs automatically on boot. To do this we are setting up a systemd service.

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
# 5. Install ZMQ
Get the tarball from http://zeromq.org/intro:get-the-software
- `cd Downloads`
- `tar xf zeromq-4.2.3.tar.gz`
- `cd zeromq-4.2.3`
- `./configure`
- `make check`
- `sudo make install`
- `sudo ldconfig`


# 6. Install go and lightning node
Go is needed to run lnd
- `sudo apt-get install golang-1.10-go`

It should install the binaries to /usr/lib/go-1.10/bin. We need to add that path to our binaries to use go from the command line. We also need to configure the go path. Create a go directory in your home director `mkdir go`. And add the following text to the `~/.profile` bash profile file.

```text
export PATH=$PATH:/usr/lib/go-1.10/bin
export GOPATH=~/go
export PATH=$PATH:$GOPATH/bin
```

Now we should be able to install the go dependence manager glide:
- `go get -u github.com/Masterminds/glide`

Next we will install lnd. More up to date instructions may be found here (https://github.com/lightningnetwork/lnd/blob/master/docs/INSTALL.md).

```bash
git clone https://github.com/lightningnetwork/lnd $GOPATH/src/github.com/lightningnetwork/lnd
cd $GOPATH/src/github.com/lightningnetwork/lnd
glide install
go install . ./cmd/...
```

# 6. Setup lnd
  - how to setup negotiate channels able to accept payments?
  - 
# 7. Install node.js
Easiest way is to use nvm:
- `wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash`
Then you need to close and re-open the terminal, then you can install the most recent node.
- `nvm install stable`

# 8. Install yarn
Yarn, package manager for nodejs (https://yarnpkg.com/en/docs/install)
- `curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -`
- `echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list`
- `sudo apt-get update`
- `sudo apt-get install --no-install-recommends yarn` #

# 9. Install dctrl-ao

Get the code from github and install the dependencies:
- `git clone ...`
- `cd dctrl-ao`
- `yarn install`

Now compile the Vue code from the /src folder into /dist. This will be served by the express service defined in /server.`yarn build`

At this point you will should be ready to run the app. `yarn start` On first start it should create a rethinkdb database called 'dctrl' and a table on it called 'events'. This is where all of the data of the app will be stored, in a single table of events. An initial member (dctrl) will be created with password 1235 that can be used for initial auth into the app.

Alternatively you can use `yarn serve` to startup the vue hot-reloading. In this mode any changes you make to the /src/ folder will be immeadiately displayed. This is useful while editing the frontend components or templating new functionality.

To recap the dctrl-ao scripts are:
- `yarn build` # compile the vue code to /dist
- `yarn start` # eventstate server & web app, hosted at http://localhost:8003
- `yarn serve` # hot reloading + dev-tools (https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)

You should now be able to navigate to localhost:8003 to find the dctrl-ao admin console. Log in as the first user (dctrl:1235).

# 10. Connect any rfid scanning Pi's
See the setup instructions at (https://github.com/dctrl-ao/fobtap)

# 11. Setup dctrl-ao as a service - (using pm2 this time)
( http://pm2.keymetrics.io/ )

# 12. Host on the internet!
TODO
# 13. Host on cjdns / meshnet
TODO
