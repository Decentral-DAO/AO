// TODO how to secure multisig, webserver, ln node & network

## TODO

### Secure SSH

### HTTPS / SSL

Use lets encrypt

- Configure the dns - point to ao.dctrl.ca
- Use certbot

### Tor Relay
Copy the configuration file from the samples into the /etc/tor/torrc file.

- `deb https://deb.torproject.org/torproject.org bionic main`
- `deb-src https://deb.torproject.org/torproject.org bionic main`
- `gpg --keyserver keys.gnupg.net --recv A3C4F0F979CAA22CDBA8F512EE8CBC9E886DDD89`
- `gpg --export A3C4F0F979CAA22CDBA8F512EE8CBC9E886DDD89 | sudo apt-key add -`
- `sudo apt update`
- `sudo apt install tor deb.torproject.org-keyring`

This install process for tor automatically sets up a systemd instance so you can check it is active with:
- `systemctl status tor`

You can check the status of the bitcoin nodes tor connection by (bitcoind cycles new tor onions on it's own)
- `bitcoin-cli getnetworkinfo`

The sample torrc sets up a hidden service for ao on 8003. You can find the address of the .onion that was created here:
- `sudo cat /var/lib/tor/ao-service/hostname`

###  Multisig party: How to safely


### KeePassX - shared passwords
###  Network hardening:
### Split network: secure / public
###  Backup db script
