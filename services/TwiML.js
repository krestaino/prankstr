const builder = require('xmlbuilder')
const fs = require('fs-extra')

const TwiML = {
  build (hash) {
    return new Promise((resolve, reject) => {
      const xml = builder.create('Response')
        .ele('Play', `https://prankstr.kmr.io/mp3/${hash}.mp3`)
        .end({ pretty: true})
        
      fs.writeFile('xml/' + hash + '.xml', xml, err => {
        resolve()
      })
    })
  }
}

module.exports = TwiML
