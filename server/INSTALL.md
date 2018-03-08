# dctrl/ao server install instructions

These instructions will assume you are setting up dctrl/ao on a fresh install of
- Ubuntu 17.10 - https://www.ubuntu.com/download/desktop

To create a bootable Ubuntu usb (on linux) download the .iso file from the above link. Run the command `sudo fdisk -l` to see a list of the the plugged in drives. Once you have selected the correct drive (ie. /dev/sdb) run: The dd command specifies an input file (if) which is the iso and an output file (of) which is the usd drive. Careful this formats the usb!
- `sudo unmount <path-to-usb>`
- `sudo dd if=<path-to-ubuntu-iso> of=<path-to-usb> bs=1M`
- i.e. `sudo dd if=./Downloads/Ubuntu-17.10.iso> of=/dev/sdb bs=1M`


This should create a bootable usb and you can then go through the ubuntu install process by interupting the computers boot up with `delete` or `f10`.

---

Now that we have an operating system, the first thing we need is a database to store and persist our applications state. Our database of choice is rethinkdb. We are following the instructions from https://www.rethinkdb.com/docs/build/ with some modifications for 17.10 -->
- first download and unpack the source;
  - `cd Downloads`
  - `wget https://download.rethinkdb.com/dist/rethinkdb-2.3.6.tgz`
  - `tar xf rethinkdb-2.3.6.tgz`
- Now there should be a rethinkdb folder:
  - `cd rethinkdb-2.3.6`
- Now we can build, these commands take some time, get some coffee...
  - ```sudo apt install build-essential protobuf-compiler python libprotobuf-dev libcurl4-openssl-dev libboost-all-dev libncurses5-dev libjemalloc-dev wget m4 clang libssl-dev```
  - `./configure --allow-fetch CXX=clang++`
  - `make`
  - `sudo make install`

After doing the above commands you should have rethinkdb installed. Use the command `which rethinkdb` to ensure. If installed correctly the path to the executable file (in my case /usr/local/bin/rethinkdb) will be printed. Now that we have rethinkdb installed we want to set it up so it runs automatically on boot. To do this we are setting up a systemd service. 



1. rethinkdb
2. bitcoind
