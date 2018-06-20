import _ from 'lodash'

function recentMuts(recent, ev){
		switch (ev.type) {
				case "cleanup":
						let now = Date.now()
						recent.forEach( (ev, i) => {
								let msSinceEvent = now - ev.timestamp
								let isOld = msSinceEvent > 1000 * 60 * 60 * 24 * 5 // three days
								if (isOld){
										_.pullAt(recent, i)
								}
						})
						break
				default:
						let isMemberEv = /member.+/.test(ev.type)
						let isTaskEv = /task.+/.test(ev.type)
						let isResourceEv = /resource.+/.test(ev.type)
						if (isMemberEv || isTaskEv || isResourceEv){
								recent.push(ev)
						}
		}
}

export default recentMuts
