const crypto = require('crypto')
const express = require('express')
const router = express.Router()

const Google = require('../services/Google')
const Twilio = require('../services/Twilio')
const TwiML = require('../services/TwiML.js')

router.post('/api/v1/json', (req, res) => {
  const message = req.body.message
  const phoneNumber = req.body.phoneNumber
  const hash = crypto.createHash('md5').update(message).digest('hex')

  Google.textToSpeech(message, hash)
    .then(() => {
      TwiML.build(hash)
    })
    .then(() => {
      Twilio.call(phoneNumber, hash)
    })
    .then(() => {
      res.send({
        hash: hash,
        message: `Calling ${phoneNumber}`,
        status: 'success'
      })
    })
    .catch(err => {
      res.send({
        message: 'Something went wrong. Please try again.',
        status: 'error'
      })
    })
})

module.exports = router
