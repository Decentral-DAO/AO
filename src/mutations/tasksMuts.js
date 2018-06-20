import _ from 'lodash'

function tasksMuts(tasks, ev) {
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
						task.lastClaimed = ev.timestamp
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
				tasks.forEach(task => {
					if (task.taskId === ev.taskId) {
							task.instructions = ev.newInstructions
					}
				})
				break
	}
}

export default tasksMuts
