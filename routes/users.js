const { Router } = require('express')
const express = require('express')
const router = express.Router()

const User = require('../models/user')
const middlewares = require('../middlewares/auth')

router.get('/', middlewares.authValidator, async (req, res) => {
    const params = req.query
    const apiKey = params.apiKey

    const user = req.user
    res.send(user)
})

module.exports = router