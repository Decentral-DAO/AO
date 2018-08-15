const uuidV1 = require('uuid/v1')
const dctrlDb = require('../dctrlDb')

function taskCreated(name, instructions, monthlyValue, cap, boost, fob, oneTime, callback) {
  let newEvent = {
    type: "task-created",
    taskId: uuidV1(),
    lastClaimed: Date.now(),
    name,
    instructions,
    monthlyValue,
    fob,
    cap,
    boost,
    oneTime: !!oneTime
  }
  dctrlDb.insertEvent(newEvent, callback)
}

function taskClaimed(taskId, memberId, paid, notes, callback) {
  let newEvent = {
    type: "task-claimed",
    taskId,
    memberId,
    paid,
    notes,
  }
  dctrlDb.insertEvent(newEvent, callback)
}

function taskBoosted(taskId, amount, callback) {
  let newEvent = {
      type: "task-boosted",
      taskId,
      amount,
  }
  dctrlDb.insertEvent(newEvent, callback)
}

function taskRateUpdated(taskId, amount, callback) {
  let newEvent = {
    type: "task-rate-updated",
    taskId,
    amount,
  }
  dctrlDb.insertEvent(newEvent, callback)
}

function taskCapUpdated(taskId, amount, callback) {
  let newEvent = {
    type: "task-cap-updated",
    taskId,
    amount,
  }
  dctrlDb.insertEvent(newEvent, callback)
}

function taskInstructionsUpdated(taskId, newInstructions, callback){
  let newEvent = {
    type: "task-instructions-updated",
    taskId,
    newInstructions,
  }
  dctrlDb.insertEvent(newEvent, callback)
}

function taskRemoved(taskId, callback){
  let newEvent = {
    type: "task-removed",
    taskId,
  }
  dctrlDb.insertEvent(newEvent, callback)
}

export default {
  taskBoosted,
  taskCreated,
  taskClaimed,
  taskInstructionsUpdated,
  taskRateUpdated,
  taskCapUpdated,
  taskRemoved,
}
