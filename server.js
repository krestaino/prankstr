require('dotenv').config()

const express = require('express')
const cors = require('cors')
const history = require('connect-history-api-fallback')
const rateLimit = require('express-rate-limit')
const api = require('./routes/api.js')

const app = express()

// rate limiting
const limiter = new rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 500, // limit each IP to 500 requests per windowMs
  delayMs: 0 // disable delaying - full speed until the max limit is reached
})

app.use(express.json())
app.use(cors())
app.use(history())
app.use(limiter)

// express routes
app.use(api)

app.use('/mp3', express.static('mp3'))
app.use('/xml', express.static('xml'))

app.listen(3002, function () {
  console.log('> Starting server...')
  console.log('> Listening at http://localhost:' + this.address().port)
})

module.exports = app
