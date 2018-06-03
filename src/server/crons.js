
import cron from 'cron'
import events from './events'
import {serverState} from './state'

const rentJob = new cron.CronJob({
  cronTime: '0 0 4 * * *', //first minute, first hour, second day
  onTick: rent,
  start: false,
  timeZone: 'America/Los_Angeles'
})

const deactivateJob = new cron.CronJob({
  cronTime: '11 11 11 * * *',
  onTick: deactivate,
  start: false,
  timeZone: 'America/Los_Angeles'
})

function rent(){
    console.log('charging for Rent')
    let activeMembers = serverState.members.filter( m => m.active >= 0)
    let numberOfActiveMembers = activeMembers.length
    let charged = serverState.cash.rent / activeMembers.length
    let notes = ''
    console.log('attempting ev create loop', {numberOfActiveMembers, charged, notes})
    activeMembers.forEach( member => {
        if (member.active >= 0){
            events.membersEvs.memberCharged(member.memberId, charged, notes)
        }
    })
}

function deactivate(){
    let deadbeatMembers = serverState.members.filter(m => m.balance <= 0)
    deadbeatMembers.forEach(m => events.membersEvs.memberDeactivated(m.memberId))
}

module.exports = function (){
    console.log('starting crons')
    rentJob.start()
    deactivateJob.start()
}
