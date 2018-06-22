require('dotenv').config()

const accountSid = 'AC576b5a499175429ed949733e2113e71f';
const authToken = process.env.TWILIO_API;
const client = require('twilio')(accountSid, authToken);

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
