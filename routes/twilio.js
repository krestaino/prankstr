require('dotenv').config()

const accountSid = 'AC576b5a499175429ed949733e2113e71f';
const authToken = process.env.TWILIO_API;
const client = require('twilio')(accountSid, authToken);

client.calls
.create({
    url: 'http://blog.shure.com/webteam/twil/demo.xml',
    to: process.env.TEST_PHONE,
    from: process.env.TWILIO_PHONE
  })
.then(call => console.log(call.sid))
.done();
