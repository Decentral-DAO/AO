import _ from 'lodash'

function nodesMuts(nodes, ev){
	switch (ev.type) {
		case "node-status-updated":
				nodes[ev.node] = ev.status
				break
	}
}

export default nodesMuts
