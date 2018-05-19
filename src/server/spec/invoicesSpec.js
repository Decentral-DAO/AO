import utils from './utils'
import validators from './validators'
import events from '../events'

// export single middleware for each type
module.exports = function(req,res, next){
  switch (req.body.type){
      case 'invoice-created':
          specInvoiceCreated(req, res, next)
          break
      default:
          next()
  }
}

function specInvoiceCreated(req, res, next){
  let errRes = []
  console.log('specInvoiceCreated: req body --', req.body)
  if (
    validators.isId(req.body.ownerId, errRes) &&
    validators.isNotes(req.body.memo, errRes) &&
    validators.isAmount(req.body.sats, errRes)
  ){
    events.invoicesEvs.invoiceCreated(
      req.body.ownerId,
      req.body.memo,
      req.body.sats,
      utils.buildResCallback(res)
    )
  } else {
    res.status(200).send(errRes)
  }
}
