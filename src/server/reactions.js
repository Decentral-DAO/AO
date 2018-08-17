import { getResource } from './spec/utils'
import events from './events'
import { checkInitial } from './onChain/currentAccounts'

function reactions(ev){
    switch (ev.type) {
        case 'member-field-updated':
            if (ev.field === 'secret') {
                events.membersEvs.badgeAdded(ev.memberId, 'secure')
            }
            break
        case 'member-paid':
        case 'resource-stocked':
            if (parseFloat(ev.paid) > 20){
                events.membersEvs.memberActivated(ev.memberId)
            }
            break
        case 'resource-stocked':
            events.membersEvs.badgeAdded(ev.memberId, 'bitpepsi')
            break
        case 'member-address-updated':
        case 'member-created':
            checkInitial(ev.address, 'member')
            break
        case 'invoice-paid':
            if (ev.memberId) {
                events.membersEvs.memberPaid(ev.memberId, ev.amount, false, '')
                events.membersEvs.badgeAdded(ev.memberId, 'lightning')
            }
            if (ev.resourceId) {
                let resource = getResource(ev.resourceId)
                let amount = ev.amount / resource.charged
                events.resourcesEvs.resourceUsed(ev.resourceId,'', amount, 0, '')
            }
            break
    }
}

module.exports = reactions
