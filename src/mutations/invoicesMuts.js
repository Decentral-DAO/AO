import _ from 'lodash'

function invoicesMuts(invoices, ev){
	switch (ev.type) {
		case "invoice-created":
			invoices.push(ev)
			break

		case "invoice-paid":
			invoices.forEach((invoice, i) => {
					if (invoice.r_hash === ev.r_hash) {
							_.pullAt(invoices, i)
					}
			})
			break
	}
}

export default invoicesMuts
