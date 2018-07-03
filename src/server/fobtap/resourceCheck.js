const state = require('../state')
const utils = require('../spec/utils')
const validators = require('../spec/validators')
const events = require('../events')


function creditCheck(member, resource){
    let limit = member.active * 3 + 17
    let newBalance = member.balance - resource.charged
    console.log({newBalance})
    return (newBalance + limit < 0)
}

module.exports = function(req, res, next){
    let member = utils.memberFromFob(req.body.fob)
    let resource = utils.getResource(req.body.resourceId)

    let goodCredit = creditCheck(member,resource)
    if (member && resource && goodCredit){
        events.resourcesEvs.resourceUsed(
          req.body.resourceId,
          memberId,
          req.body.amount || 1,
          resource.charged || 0,
          req.body.notes || '',
          utils.buildResCallback(res)
        )
    } else {
        next()
    }
}
