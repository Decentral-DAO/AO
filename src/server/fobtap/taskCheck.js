const state = require('../state')
const utils = require('../spec/utils')
const events = require('../events')
const calculations = require('../../calculations')

var taskCheck = {
  active: false,
  task: {},
}

module.exports = function(req, res, next){
  if (!taskCheck.active){
    let task = utils.taskFromFob(req.body.fob)
    if (task){
        taskCheck.active = true
        taskCheck.task = task
        res.send('task assigned')
        console.log('task registered')
    } else {
        next()
    }
  } else {
    let memberId = utils.memberIdFromFob(req.body.fob)
    if (memberId){
        let paid = calculations.calculateTaskPayout(taskCheck.task)
        events.tasksEvs.taskClaimed(
          taskCheck.task.taskId,
          memberId,
          paid,
          '', // notes
          utils.buildResCallback(res)
        )
    }
    taskCheck.active = false
  }
}
