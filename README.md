# JobieBot

## What is jobiebot?

JobieBot is a simple Discord bot written with the Discord.js framework and Node.js runtime. It is designed to post an image link every time a command is called and allows for uploading of images taking advantage of Discord's CDN for image hosting. Image links are hosted and read from/updated to a MongoDB Atlas database, a NoSQL cloud database solution.

## Why is jobiebot?

This is handsdown my favorite personal project that I've made so far. I created this as a sort of gift for my girlfriend. It was designed to help her with the fact that she had recently moved away from home and wouldn't be able to see her beloved cat. As a way to cheer her up I asked her for as many pics of her cat as she could find and I created this.

## Why you want to use JobieBot

You probably don't. This code is not well written and is the culmination of months of on and off work and uses different techniques that are likely not only not best practice, but probably worst practice. However if you're looking for boilerplate code that might help you learn how to make your own Discord bot this might be for you. So far it can interact with a database, post links, and can join voice channel and play a (preset hard coded) youtube video.

## How to download

```Bash
git clone https://github.com/Blugil/jobiebot.git

cd jobiebot

npm install

#Configure the .env file, adjust the database string in ./db/mongo.js
#Configure the config.json file

npm start
#or
npm run dev #to start an automatic restart nodemon instance
```

## If you want to use Docker to deploy after installing

```Bash
#builds the image
docker build -t yourname/botname:tag .

#runs the container
docker run yourname/botname:tag

#runs the container in interactive mode
docker run -it yourname/botname:tag

#runs the container as a background process (best for hosting)
docker run -d yourname/botname:tag
