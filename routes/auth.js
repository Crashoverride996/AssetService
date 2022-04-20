const express = require('express')
const router = express.Router()

const User = require('../models/user')

const { randomUUID } = require('crypto')

router.post('/register', async (req, res) => {
    const userExists = await User.find({ email: req.body.email })
    if (userExists.length) {
        res.status(400).send({
            message: 'Error creating user, user already exists.'
        })
    }
    else {
        const user = new User({
            email: req.body.email,
            apiKey: randomUUID(), // Should probably hash it
            requestLimit: process.env.FREE_REQUEST_LIMIT 
        })
        try {
            const newUser = await user.save()
            res.send({ "apiKey": newUser.apiKey })
        } 
        catch {
            res.status(400).send({
                message: 'Error creating user, please try again.'
            })
        }
}
  })
  
  module.exports = router