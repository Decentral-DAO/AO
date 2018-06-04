import _ from 'lodash'

function invoicesMuts(invoices, ev){
	switch (ev.type) {
		case "invoice-created":
				invoices.push(ev)
				break
		case "invoice-paid":
				invoices.forEach((invoice, i) => {
						if (invoice.r_hash === ev.r_hash) {
								invoice.settled = true
						}
				})
				break
		case "cleanup":
				let now = Date.now()
				invoices.forEach( (invoice, i) => {
						let isOld = now - invoice.timestamp < 1000 * 60 * 60 * 50
						if (isOld){
								_.pullAt(invoices, i)
						}
				})
				break
	}
}

export default invoicesMuts
