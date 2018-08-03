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
		case "resource-booked":
			resources.forEach( resource => {
				if (resource.resourceId == ev.resourceId){
						resource.book.push(ev)
				}
			})
			break
		case "book-cancelled":
			resources.forEach( resource => {
				if (resource.resourceId == ev.resourceId){
						resource.book.forEach( (book, i) => {
								if (book.bookTime == ev.bookTime) {
										resource.book.splice(i, 1)
								}
						})
				}
			})
			break
		case "cleanup":
			break
	}
}

export default resourcesMuts
