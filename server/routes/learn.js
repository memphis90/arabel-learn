'use strict'
const router         = require('express').Router()
const authGuard      = require('../middleware/authGuard')
const LearnController = require('../controllers/LearnController')

router.get('/progress', authGuard, LearnController.getProgress)
router.post('/complete', authGuard, LearnController.completeItem)

module.exports = router
