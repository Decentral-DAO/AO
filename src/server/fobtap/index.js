const express = require('express')
const router = express.Router()
const taskCheck = require('./taskCheck')
const resourceCheck = require('./resourceCheck')

router.use('/fobtap', taskCheck)
router.use('/fobtap', resourceCheck)

router.use('/fobtap', (req, res)=> {
    res.end('fobtap not handled')
})


module.exports = router
