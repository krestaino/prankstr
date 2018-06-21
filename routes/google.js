const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');

const config = {
  projectId: 'prankstr-207919',
  keyFilename: './keyfile.json'
};

const client = new textToSpeech.TextToSpeechClient(config);

const text = 'this is a test';
const outputFile = 'output.mp3';

const request = {
  input: {text: text},
  voice: {languageCode: 'en-US', name: 'en-US-Wavenet-F', ssmlGender: 'FEMALE'},
  audioConfig: {audioEncoding: 'MP3'},
};

client.synthesizeSpeech(request, (err, response) => {
  if (err) {
    console.error('ERROR:', err);
    return;
  }

  fs.writeFile(outputFile, response.audioContent, 'binary', err => {
    if (err) {
      console.error('ERROR:', err);
      return;
    }
    console.log(`Audio content written to file: ${outputFile}`);
  });
});
