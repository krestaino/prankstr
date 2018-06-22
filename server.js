require('dotenv').config()

const express = require('express')
const cors = require('cors')
const history = require('connect-history-api-fallback')
const rateLimit = require('express-rate-limit')
const api = require('./routes/api.js')

const server = express()

// rate limiting
const limiter = new rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 500, // limit each IP to 500 requests per windowMs
  delayMs: 0 // disable delaying - full speed until the max limit is reached
})

server.use(express.json())
server.use(cors())
server.use(history())
server.use(limiter)

// express routes
server.use(api)

server.get('/mp3/*', function(req, res){
  res.contentType('audio/mpeg')
  res.sendFile(__dirname + req.url)
})

server.post('/xml/*', function(req, res){
  res.contentType('application/xml')
  res.sendFile(__dirname + req.url)
})

server.listen(3002, function () {
  console.log('> Starting server...')
  console.log('> Listening at http://localhost:' + this.address().port)
})
