const User = require('../models/user')

module.exports = {
    authValidator: async (req, res, next) => {
        const params = req.query
        if (!params.apiKey) {
            res.status(400).send({
                message: 'Api key must be provided.'
            });
        }
        else {
            try {
                const user = await User.find({ apiKey: params.apiKey })
                req.user = user[0]
                next()
            }
            catch (err) {
                console.error(err)
                res.status(404).send({
                    message: 'User not found.'
                });
            }
        }
    },

    requestLimitValidator: async (req, res, next) => {
        const params = req.query
        const apiKey = params.apiKey

        const user = req.user
        if (user.requestLimit === 0) {
            res.status(400).send({
                message: 'Request limit exceeded please contact suport to switch to different pricing tier.'
            })
        }
        else {
            next()
        }
    }
}