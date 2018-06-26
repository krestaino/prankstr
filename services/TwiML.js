// dependencies
const builder = require('xmlbuilder')
const fs = require('fs-extra')

const TwiML = {
  create (hash) {
    return new Promise((resolve, reject) => {
      // creates XML file for Twilio
      const xml = builder.create('Response')
        .ele('Pause', {'length': '1'})
        .up()
        .ele('Play', `https://prankstr.kmr.io/mp3/${hash}.mp3`)
        .up()
        .ele('Pause', {'length': '1'})
        .end({ allowEmpty: true, pretty: true})
        
      fs.writeFile('xml/' + hash + '.xml', xml, err => {
        resolve()
      })
    })
  }
}

module.exports = TwiML
