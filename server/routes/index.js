'use strict'
const router = require('express').Router()

router.use('/auth',  require('./auth'))
router.use('/learn', require('./learn'))

module.exports = router
