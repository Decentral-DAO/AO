function joinersMuts(joiners, ev){
		switch (ev.type) {
				case "joiner-created":
						joiners.push(ev)
						break
				case "joiner-vouched":
						joiners.forEach( j => {
								if (j.joinerId == ev.joinerId){
										if ( j.vouchers.indexOf(ev.memberId) == -1){
												j.vouchers.push( ev.memberId )
										}
								}
						})
						break
				case "member-created":
						joiners.forEach( (j, i) => {
								if (j.name == ev.name){
										joiners.splice(i, 1)
								}
						})
						break
				case "joiner-rejected":
						joiners.forEach( (j, i) => {
								if (j.joinerId == ev.joinerId){
										joiners.splice(i, 1)
								}
						})
						break
				default:
		}
}

export default joinersMuts
