// dependencies
const crypto = require('crypto')
const fs = require('fs-extra')
const path = require('path')
const textToSpeech = require('@google-cloud/text-to-speech')

// import Google Cloud API service credentials
// https://console.cloud.google.com/iam-admin/serviceaccounts/project
// export the key as JSON and rename the file to `keyfile.json`
const config = {
  keyFilename: './keyfile.json'
}

// initialize text-to-speech client
const client = new textToSpeech.TextToSpeechClient(config)

const Google = {
  // text-to-speech config
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
    // set message to text-to-speech config
    this.request.input.text = message

    return new Promise((resolve, reject) => {
      // file exists, skipping text-to-speech
      if (path.join(__dirname, `../mp3/${hash}.mp3`)) {
        resolve()
      }

      // convert text-to-speech and save result as an MP3 file
      client.synthesizeSpeech(Google.request, (err, response) => {
        fs.writeFile('mp3/' + hash + '.mp3', response.audioContent, 'binary', err => {
          resolve() 
        })
      })
    })
  }
}

module.exports = Google
