const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const crypto = require('crypto');

const config = {
  keyFilename: './keyfile.json'
};

const client = new textToSpeech.TextToSpeechClient(config);

const text = 'this is a test message!';
const hash = crypto.createHash('md5').update(text).digest('hex');
const xml = 
`<Response>
  <Play>/xml/${hash}.xml</Play>
</Response>`

const request = {
  input: {
    text: text
  },
  voice: {
    languageCode: 'en-US',
    name: 'en-US-Wavenet-F',
    ssmlGender: 'FEMALE'
  },
  audioConfig: {
    audioEncoding: 'MP3'
  },
};

client.synthesizeSpeech(request, (err, response) => {
  if (err) {
    console.error('ERROR:', err);
    return;
  }

  fs.writeFile('audio/' + hash + '.mp3', response.audioContent, 'binary', err => {
    if (err) {
      console.error('ERROR:', err);
      return;
    }
    console.log('MP3 saved');
  });

  fs.writeFile('xml/' + hash + '.xml', xml, err => {
    if (err) {
      console.error('ERROR:', err);
      return;
    }
    console.log('XML saved');
  });
});
