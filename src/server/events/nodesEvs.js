const dctrlDb = require('../dctrlDb')

function nodeStatusUpdated(nodeStr, nodeStatus, callback) {
  let newEvent = {
      type: "node-status-updated",
      node: nodeStr,
      status: nodeStatus,
  }
  dctrlDb.insertEvent(newEvent, callback)
}

export default {
  nodeStatusUpdated
}
