import events from './events'
import {checkInitial} from './onChain/currentAccounts'

function reactions(ev){
    switch (ev.type) {
        case 'member-field-updated':
            if (ev.field === 'secret') {
                events.membersEvs.badgeAdded(ev.memberId, 'secure')
            }
            break
        case 'member-paid':
            if (ev.amount > 33){
                events.membersEvs.memberActivated(ev.memberId)
            }
            break
        case 'resource-stocked':
            events.membersEvs.badgeAdded(ev.memberId, 'bitpepsi')
            break
        case 'member-address-updated':
            checkInitial(ev.address, 'member')
            break
        case 'invoice-paid':
            if (ev.memberId) {
                events.membersEvs.memberPaid(ev.memberId, ev.amount, false, '')
                events.membersEvs.badgeAdded(ev.memberId, 'lightning')
            }
            break
    }
}


module.exports = reactions
