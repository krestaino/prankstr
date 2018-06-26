// dependencies
const crypto = require('crypto')
const express = require('express')
const router = express.Router()

// thrid party services
const Google = require('../services/Google')
const Twilio = require('../services/Twilio')
const TwiML = require('../services/TwiML.js')

// api route
router.post('/api/v1/json', (req, res) => {
  // variables from POST
  const message = req.body.message
  const phoneNumber = req.body.phoneNumber
  const hash = crypto.createHash('md5').update(message).digest('hex')

  // convert text-to-speech, returns promise
  Google.textToSpeech(message, hash)
    .then(() => {
      // creates xml file for Twilio, returns promise
      TwiML.create(hash)
    })
    .then(() => {
      // initialize Twilio call, returns promise
      Twilio.call(phoneNumber, hash)
    })
    .then(() => {
      // success
      res.send({
        hash: hash,
        message: `Calling ${phoneNumber}`,
        status: 'success'
      })
    })
    .catch(() => {
      // failure
      res.send({
        message: 'Something went wrong. Please try again.',
        status: 'error'
      })
    })
})

module.exports = router
