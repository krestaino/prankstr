require('dotenv').config()

const accountSid = process.env.TWILIO_SID
const authToken = process.env.TWILIO_API
const client = require('twilio')(accountSid, authToken)

const Twilio = {
  call (phoneNumber, hash) {
    return new Promise((resolve, reject) => {
      client.calls
        .create({
            url: `https://prankstr.kmr.io/xml/${hash}.xml`,
            to: phoneNumber,
            from: process.env.TWILIO_PHONE
          })
        .then(console.log(`Calling ${phoneNumber} using ${hash} `))
        .done()
        resolve()
    })
  }
}

module.exports = Twilio
