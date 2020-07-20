# JobieBot

JobieBot is a simple Discord bot written with the Discord.js framework and Node.js runtime. It is designed to post an image link every time a command is called and allows for uploading of images taking advantage of Discord's CDN for image hosting. Image links are hosted and read from/updated to a MongoDB Atlas database, a NoSQL database solution.

## How to download

```Bash

git clone https://github.com/Blugil/jobiebot.git

cd jobiebot

npm install

Configure the .env file, adjust the database string in ./db/mongo.js

npm start
```
