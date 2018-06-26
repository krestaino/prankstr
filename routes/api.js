const crypto = require('crypto')
const express = require('express')
const router = express.Router()

const google = require('../services/google.js')
const twilio = require('../services/twilio.js')

router.post('/api/v1/json', (req, res) => {
  const message = req.body.message
  const phoneNumber = req.body.phoneNumber
  const hash = crypto.createHash('md5').update(message).digest('hex')

  google.textToSpeech(message, hash)
    .then(() => {
      twilio.call(phoneNumber, hash)
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
