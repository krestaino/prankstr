// Twilio API credentials
const accountSid = process.env.TWILIO_SID
const authToken = process.env.TWILIO_API

// dependencies
const client = require('twilio')(accountSid, authToken)

const Twilio = {
  call (phoneNumber, hash) {
    return new Promise((resolve, reject) => {
      // initialize Twilio call
      client.calls
        .create({
            url: `${process.env.APP_URL}/xml/${hash}.xml`,
            to: phoneNumber,
            from: process.env.TWILIO_PHONE
          })
        .then(console.log(`Calling ${phoneNumber} with ${hash}.mp3 `))
        .done()
        resolve()
    })
  }
}

module.exports = Twilio
