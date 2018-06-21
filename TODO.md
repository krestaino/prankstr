enter phone number and message
generate md5 hash from message
check if hash exists in ./audio/, if so, skip google text to speech
if doesnt exist, convert text to speech and save file as ./audio/hash.mp3
use twilio to call number and refernce mp3 from http:/localhost/audio/hash.mp3
