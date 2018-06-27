import uuidV1 from 'uuid/v1'
import dctrlDb from '../dctrlDb'

function joinerCreated(name, callback) {
    let newEvent = {
        type: "joiner-created",
        joinerId: uuidV1(),
        name,
        balance: 0,
        vouchers: []
    }

    dctrlDb.insertEvent(newEvent, callback)
}

function joinerVouched (joinerId, memberId, callback){

    let newEvent = {
        type: "joiner-vouched",
        joinerId,
        memberId
    }
    dctrlDb.insertEvent(newEvent, callback)
}

export default {
    joinerCreated,
    joinerVouched
}
