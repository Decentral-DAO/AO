import utils from './utils'
import validators from './validators'
import events from '../events'
import state from '../state'

module.exports = function(req,res, next){
  switch (req.body.type){
      case 'joiner-vouched':
          specJoinerVouched(req, res, next)
          break
      case 'joiner-rejected':
          specJoinerRejected(req, res, next)
          break
      default:
          next()
  }
}

function specJoinerVouched(req, res, next){
  let errRes = []
  if (
    validators.isMemberId(req.body.memberId, errRes) &&
    validators.isJoinerId(req.body.joinerId, errRes)
  ){
    events.joinersEvs.joinerVouched(
      req.body.joinerId,
      req.body.memberId,
      utils.buildResCallback(res)
    )
  } else {
    res.status(200).send(errRes)
  }
}

function specJoinerRejected(req, res, next){
  let errRes = []
  if (
    validators.isMemberId(req.body.memberId, errRes) &&
    validators.isJoinerId(req.body.joinerId, errRes)
  ){
    events.joinersEvs.joinerRejected(
      req.body.joinerId,
      req.body.memberId,
      utils.buildResCallback(res)
    )
  } else {
    res.status(200).send(errRes)
  }
}
