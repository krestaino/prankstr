const builder = require('xmlbuilder')
const fs = require('fs-extra')

const TwiML = {
  build (hash) {
    return new Promise((resolve, reject) => {
      const xml = builder.create('Response')
        .ele('Pause', {'type': 'length'}, '1')
        .ele('Play', `https://prankstr.kmr.io/mp3/${hash}.mp3`)
        .ele('Pause', {'type': 'length'}, '1')
        .end({ pretty: true})
        
      fs.writeFile('xml/' + hash + '.xml', xml, err => {
        resolve()
      })
    })
  }
}

module.exports = TwiML
