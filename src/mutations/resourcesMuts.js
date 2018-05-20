import _ from 'lodash'

function resourcesMuts(resources, ev){
	switch (ev.type) {
		case "resource-created":
			resources.push(ev)
			break
		case "resource-used":
			resources.forEach( resource => {
				if (resource.resourceId == ev.resourceId){
					resource.stock -= parseFloat(ev.amount)
					let isMemberCurrent = resource.current.some(curr => {
							// replace that sessions creds,
							let match = false
							if (curr.memberId === ev.memberId){
									match = true
									_.merge(curr, ev)
							}
							return match // true terminates the some loop & idHasSession->true too
					})
					if (isMemberCurrent){
						 // edited in array
					} else {
							resource.current.push(ev)
					}
				}
			})
			break
		case "resource-stocked":
			resources.forEach( resource => {
				if (resource.resourceId == ev.resourceId){
					resource.stock += parseFloat(ev.amount)
				}
			})
			break
		case "cleanup":
			resources.forEach( r => {
					r.current = _.filter(r.current, ev => {
							let sinceEvent = Date.now() - ev.timestamp
							let isCurrent = sinceEvent < 1000 * 60 * 60 * 5 // 5 hours
							return isCurrent
					})
			})
			break
	}
}

export default resourcesMuts
