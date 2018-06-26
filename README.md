## Getting Started

``` bash
# clone repo
git clone git@github.com:krestaino/prankstr.git

# install express server dependencies
cd prankstr
npm install

# setup environment variables (refer to .env.template)
touch .env
echo "TWILIO_API=<STRING>" >> .env
echo "TWILIO_SID=<STRING>" >> .env
echo "TWILIO_PHONE=<NUMBER>" >> .env
echo "SERVER_PORT=<NUMBER>" >> .env

# install vue app dependencies
cd app
npm install

# build frontend vue app
npm run build

# start express server at localhost:<SERVER_PORT>
cd ../
npm start
```