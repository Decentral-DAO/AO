import lnd from '../onLightning/lnd.js'

import uuidV1 from 'uuid/v1'
import dctrlDb from '../dctrlDb'
import { checkInitial } from '../onChain/currentAccounts'

const NESTED_PUBKEY_HASH = 1

function memberCreated(name, fob, secret, callback) {
    lnd.getClient().newAddress({
        type: NESTED_PUBKEY_HASH ,
    }, (err, response)=>{
        let a
        if (err) {
            console.log('couldnt get an address')
            a = ''
        }
        console.log('new address from lnd', response.address)
        a = response.address
        let newEvent = {
            type: "member-created",
            memberId: uuidV1(),
            fob,
            name,
            secret,
            address: a,
            active: 1,
            balance: 0,
            badges: [],
            info: {}
        }
        checkInitial(newEvent.address, 'member')
        dctrlDb.insertEvent(newEvent, callback)
    })

}

function memberPaid(memberId, paid, isCash, notes, callback) {
  let newEvent = {
      type: "member-paid",
      memberId,
      paid,
      isCash,
      notes
  }
  dctrlDb.insertEvent(newEvent, callback)
}

function memberCharged(memberId, charged, notes, callback) {
    let newEvent = {
        type: "member-charged",
        memberId,
        charged,
        notes,
    }
    dctrlDb.insertEvent(newEvent, callback)
}

function memberDeactivated(memberId, callback) {
  let newEvent = {
    type: "member-deactivated",
    memberId,
  }
  dctrlDb.insertEvent(newEvent, callback)
}

function memberActivated(memberId, callback) {
  let newEvent = {
    type: "member-activated",
    memberId,
  }
  dctrlDb.insertEvent(newEvent, callback)
}

function memberAddressUpdated(memberId, address, proof, callback){
  let newEvent = {
      type: "member-address-updated",
      memberId,
      address,
      proof,
  }
  checkInitial(newEvent.address, 'member')
  dctrlDb.insertEvent(newEvent, callback)
}

function memberFieldUpdated(memberId, field, newfield, callback){
  let newEvent = {
    type: "member-field-updated",
    memberId,
    field,
    newfield,
  }
  dctrlDb.insertEvent(newEvent, callback)
}

function badgeAdded(memberId, badge, callback) {
  let newEvent = {
      type: "badge-added",
      memberId,
      badge,
  }
  dctrlDb.insertEvent(newEvent, callback)
}

function badgeRemoved(memberId, badge, callback) {
  let newEvent = {
      type: "badge-removed",
      memberId,
      badge,
  }
  dctrlDb.insertEvent(newEvent, callback)
}

export default {
  memberCreated,
  memberPaid,
  memberCharged,
  memberDeactivated,
  memberActivated,
  memberAddressUpdated,
  memberFieldUpdated,
  badgeAdded,
  badgeRemoved
}
