## Getting Started

``` bash
# clone repo
git clone git@github.com:krestaino/prankstr.git

# install express server dependencies
cd prankstr
npm install

# setup environment variables for Twilio and Google API's
touch .env
echo "TWILIO_API=KEY_GOES_HERE" >> .env
echo "GOOGLE_API=KEY_GOES_HERE" >> .env

# install vue app dependencies
cd app
npm install

# build vue app
npm run build

# start express server at localhost:3000
cd ../
npm start
```