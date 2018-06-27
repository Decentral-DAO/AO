import express from 'express'

import membersSpec from './membersSpec'
import tasksSpec from './tasksSpec'
import cashSpec from './cashSpec'
import resourcesSpec from './resourcesSpec'
import invoicesSpec from './invoicesSpec'
import sessionsSpec from './sessionsSpec'
import joinersSpec from './joinersSpec'

const router = express.Router()

router.post('/events', membersSpec)
router.post('/events', cashSpec)
router.post('/events', tasksSpec)
router.post('/events', resourcesSpec)
router.post('/events', invoicesSpec)
router.post('/events', sessionsSpec)
router.post('/events', joinersSpec)

module.exports = router
