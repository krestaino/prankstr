// environmental variables
require('dotenv').config()

// dependencies
const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')

// routes
const api = require('./routes/api.js')

// initialize express server
const server = express()

// rate limiting
const limiter = new rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // limit each IP to 100 requests per windowMs
  delayMs: 0 // full speed until the max limit is reached
})

// extending express server functionality
server.use(express.json())
server.use(cors())
server.use(limiter)

// express routes
server.use(api)

// serve built frontend vue app at http://localhost/
server.use(express.static('app/dist'))

// serve MP3 files
server.get('/mp3/*', (req, res) => {
  res.contentType('audio/mpeg')
  res.sendFile(__dirname + req.url)
})

// serve XML files
server.post('/xml/*', (req, res) => {
  res.contentType('application/xml')
  res.sendFile(__dirname + req.url)
})

// start server
server.listen(process.env.SERVER_PORT, () => {
  console.log('> Starting server...')
  console.log('> Listening at http://localhost:' + process.env.SERVER_PORT)
})
