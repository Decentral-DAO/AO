
import cron from 'cron'
import events from './events'
import {serverState} from './state'

const rentJob = new cron.CronJob({
  cronTime: '0 0 0 1 * *',
  onTick: rent,
  start: false,
  timeZone: 'America/Los_Angeles'
})

const deactivateJob = new cron.CronJob({
  cronTime: '11 11 11 11 * *',
  onTick: deactivate,
  start: false,
  timeZone: 'America/Los_Angeles'
})

function rent(){
    console.log('charging for Rent')
    let activeMembers = serverState.members.filter( m => m.active >= 0)
    let numberOfActiveMembers = activeMembers.length
    let fixed = parseFloat(serverState.cash.rent)
    let variable = parseFloat(serverState.cash.variable)
    let numActiveMembers = activeMembers.length
    let perMonth = ( fixed + variable ) / numActiveMembers
    let charged = Math.min(perMonth, parseFloat( serverState.cash.cap ))
    let notes = ''
    console.log('attempting ev create loop', {numActiveMembers, charged, notes})
    activeMembers.forEach( m => {
        events.membersEvs.memberCharged(m.memberId, charged, notes)
    })
}

function deactivate(){
    let deadbeats = serverState.members.filter(m => {
        return (m.active >= 0 && m.balance < 0)
    })
    deadbeats.forEach(m => {
        events.membersEvs.memberDeactivated(m.memberId)
    })
}

module.exports = function (){
    console.log('starting crons')
    rentJob.start()
    deactivateJob.start()
}
