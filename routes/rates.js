const express = require('express')
const router = express.Router()

const User = require('../models/user')
const providers = require('../utils/providers')
const middlewares = require('../middlewares/auth')

const axios = require('axios');

router.get('/', middlewares.authValidator, middlewares.requestLimitValidator, async (req, res) => {
    const params = req.query
    console.log(params)
    if (!params.currency) {
        res.status(400).send({
            message: 'Currency must be provided.'
        });
    }

    var cryptoTs = null
    var serviceType = 'cryptoCompare'

    if (params.date) {
        var myDate = params.date
        myDate = myDate.split("-")
        if (myDate.length != 3) {
            res.status(400).send({
                message: 'Date must be in format dd-mm-yyyy.'
            });
        }
        var newDate = new Date( myDate[2], myDate[1] - 1, myDate[0])
        cryptoTs = newDate.getTime()
    }
    else if (params.serviceType) {
        serviceType = params.serviceType
    }

    var serviceUrl = providers.getUrlFromProviderType(serviceType) + params.currency
    if (cryptoTs) {
        serviceUrl += '&toTs=' + cryptoTs
    }

    const user = req.user
    await User.updateOne({ apiKey: params.apiKey }, { requestLimit: user.requestLimit - 1 } )
            
    axios.post(serviceUrl)
    .then((resp) => {
        console.log(`Status: ${resp.status}`)
        console.log('Body: ', resp.data)

        res.send(resp.data)
    })
    .catch((err) => {
        console.error(err);
        res.status(400).send({
            message: 'Something went wrong, please try again.'
        });
    })
})

module.exports = router