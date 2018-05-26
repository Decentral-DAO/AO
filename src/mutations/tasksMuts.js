import _ from 'lodash'

function tasksMuts(tasks, ev) {
	console.log('task mutation called', ev.type)
	switch (ev.type) {
		case "task-created":
			tasks.push(ev)
			break
		case "task-claimed":
			tasks.forEach(task => {
				if (task.taskId === ev.taskId) {
					if (task.oneTime) {
						_.remove(tasks, (task) => task.taskId === ev.taskId )
					} else {
						task.lastClaimedBy = ev.memberId
						task.lastClaimed = Date.now()
						task.boost = 0
					}
				}
			})
			break
		case "task-rate-updated":
			tasks.forEach(task => {
				if (task.taskId === ev.taskId) {
					task.monthlyValue = parseFloat(ev.amount)
				}
			})
			break
		case "task-boosted":
			tasks.forEach(task => {
				if (task.taskId === ev.taskId) {
					task.boost = parseFloat(ev.amount)
				}
			})
			break
		case "task-instructions-updated":
				console.log('mutating instructions update')
				tasks.forEach(task => {
					console.log('looping through task')
					if (task.taskId === ev.taskId) {
							console.log('updating instructions')
							task.instructions = ev.newInstructions
					}
				})
				break
	}
}

export default tasksMuts
