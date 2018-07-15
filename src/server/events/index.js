import _ from 'lodash'
import cashEvs from './cashEvs'
import membersEvs from './membersEvs'
import tasksEvs from './tasksEvs'
import resourcesEvs from './resourcesEvs'
import invoicesEvs from './invoicesEvs'
import sessionsEvs from './sessionsEvs'
import joinersEvs from './joinersEvs'
import nodesEvs from './nodesEvs'
// //
// expose all of the events in a single object
module.exports = {
    joinersEvs,
    cashEvs,
    membersEvs,
    tasksEvs,
    resourcesEvs,
    invoicesEvs,
    sessionsEvs,
    nodesEvs,
}
