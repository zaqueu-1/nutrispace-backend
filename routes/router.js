const router = require('express').Router();

const patientRouter = require('./patient')
const userRouter = require('./user')
const loginRouter = require('./login')

router.use('/', patientRouter)
router.use('/', userRouter)
router.use('/', loginRouter)

module.exports = router;