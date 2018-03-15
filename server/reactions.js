import events from './events'

function reactions(ev){
    switch (ev.type) {
        case 'member-field-updated':
            if (ev.field === 'secret') {
                // TODO: check if already have it
                events.membersEvs.badgeAdded(ev.memberId, 'secure')
            }
            break
        case 'member-paid':
            events.membersEvs.memberActivated(ev.memberId)
            break
        case 'resource-stocked':
            events.membersEvs.badgeAdded(ev.memberId, 'bitpepsi')
            break
    }
}


module.exports = reactions
