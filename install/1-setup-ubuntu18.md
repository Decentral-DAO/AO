TODO - to Ubuntu 18

# ao server install instructions

These instructions will assume you are setting up dctrl/ao on a fresh install of
- Ubuntu 17.10 - https://www.ubuntu.com/download/desktop

### Operating System (Ubuntu)

To create a bootable Ubuntu usb (on linux) download the .iso file from the above link. Run the command `sudo fdisk -l` to see a list of the the plugged in drives. Once you have selected the correct drive (ie. /dev/sdb) run: The dd command specifies an input file (if) which is the iso and an output file (of) which is the usd drive. Careful this formats the usb!
- `sudo umount <path-to-usb>`
- `sudo dd if=<path-to-ubuntu-iso> of=<path-to-usb> bs=1M`
- i.e. `sudo dd if=./Downloads/Ubuntu-17.10.iso> of=/dev/sdb bs=1M`

This should create a bootable usb and you can then go through the ubuntu install process by interupting the computers boot up with `delete` or `f10`.
---

### ZMQ

http://zeromq.org/intro:get-the-software

Get the tar from the above link. Then unpack it and install with the following commands.

- `tar xf zeromq-4.2.3.tar.gz`
- `cd zeromq-4.2.3/`
- `./configure`
- `make`
- `sudo make install`

Don't skip this or the yarn install later will fail.

### Database (Rebirth / Rethink)

A database is needed to store and persist our applications state. Our database of choice is rebirthdb (formerly rethinkdb), an awesome open source db.

- `git clone https://github.com/RebirthDB/rebirthdb.git`
- `./configure --allow-fetch CXX=clang++`
- `make -j4 DEBUG=1`
- `sudo make install`

Use the command `which rethinkdb`. If installed correctly the path to the executable file (in my case /usr/local/bin/rethinkdb) will be printed. The db can be started by `rethinkdb`.

---

### Blockchain (Bitcoin)
First get the bitcoin binaries from https://bitcoin.org/en/download and unpack them

- `cd Downloads`
- `tar xf bitcoin-<version>-x86_64-linux-gnu.tar.gz`

This will create the binaries in `/bitcoin-<version>/bin/ ` which can be run directly.
---

### Layer 2 (Lightning)

Go is needed to run lnd
- `sudo apt-get install golang-1.10-go`

It should install the binaries to /usr/lib/go-1.10/bin. We need to add that path to our binaries to use go from the command line. We also need to configure the go path. Create a go directory in your home director `mkdir go`. Add the following text to the `~/.profile` bash profile file.

```text
export PATH=$PATH:/usr/lib/go-1.10/bin
export GOPATH=~/go
export PATH=$PATH:$GOPATH/bin
```

With go, we install lnd. (https://github.com/lightningnetwork/lnd/blob/master/docs/INSTALL.md).

```bash
go get -d github.com/lightningnetwork/lnd
cd $GOPATH/src/github.com/lightningnetwork/lnd
make && make install
```

Now we can run the lightning daemon with `lnd` and access it from the command line using `lncli`.
---

### Javascript Dev (Node.js)
Easiest way is to use nvm:
- `wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash`
Then you need to close and re-open the terminal, then you can install the most recent node.
- `nvm install 9` ## TODO - make it work with 10

Yarn is a dependency manager for nodejs (https://yarnpkg.com/en/docs/install)

- `curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -`
- `echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list`
- `sudo apt-get update`
- `sudo apt-get install --no-install-recommends yarn`
---

### Autonomous Organization

Get the code from github and install the dependencies:
- `git clone https://github.com/dctrl-ao/ao.git`
- `cd ao`
- `yarn build`

At this point you will should be ready to run the app in dev mode. Try `yarn serve` to startup with vue hot-reloading. In this mode any changes you make to the /src/ folder will be immeadiately displayed. This is useful while editing styles & templating new functionality.

The scripts are:
- `yarn buildFront` # compile the vue code to /dist
- `yarn buildBack` # compile the server code to /production
- `yarn serve` # hot reloading + dev-tools (https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
- `yarn start` # eventstate server & web app, hosted at http://localhost:8003
- `yarn compile` # yarn buildFront && yarn buildBack && yarn start

Now we have everything we need but need to create configuration files
---

### Configuration For Deving
