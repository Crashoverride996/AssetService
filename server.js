if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.json());
app.use(express.static('public'))
app.use(logger)

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/', indexRouter)

const authRouter = require('./routes/auth')
const ratesRouter = require('./routes/rates')
// userRoute is not fully implemented
const userRouter = require('./routes/users')

app.use('/v1/auth', authRouter)
app.use('/v1/users', userRouter)
app.use('/v1/rates', ratesRouter)

function logger(req, res, next) {
    console.log(req.originalUrl)
    next()
}

app.listen(process.env.PORT || 3000)