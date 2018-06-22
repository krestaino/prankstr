const textToSpeech = require('@google-cloud/text-to-speech')
const fs = require('fs-extra')
const crypto = require('crypto')

const config = {
  keyFilename: './keyfile.json'
}

const client = new textToSpeech.TextToSpeechClient(config)

const Google = {
  request: {
    input: {
      text: null
    },
    voice: {
      languageCode: 'en-US',
      name: 'en-US-Wavenet-F',
      ssmlGender: 'FEMALE'
    },
    audioConfig: {
      audioEncoding: 'MP3'
    }
  },
  textToSpeech (message, hash) {
    this.request.input.text = message
    const xmlTemplate = `
      <Response>
        <Play>https://prankstr.kmr.io/mp3/${hash}.mp3</Play>
      </Response>
    `

    return new Promise((resolve, reject) => {
      client.synthesizeSpeech(Google.request, (err, response) => {
        fs.writeFile('mp3/' + hash + '.mp3', response.audioContent, 'binary', err => {
          fs.writeFile('xml/' + hash + '.xml', xmlTemplate, err => {
            resolve()
          })
        })
      })
    })
  }
}

module.exports = Google
