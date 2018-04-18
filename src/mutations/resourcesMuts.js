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
			resources.forEach( resource => {
					resource.current = _.filter(resource.current, ev => {
							// XXX
							return  Date.now() - parseInt(ev.timestamp) > 10000
					})
			})
			break
	}
}

export default resourcesMuts
