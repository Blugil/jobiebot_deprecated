# JobieBot

## What is jobiebot?

JobieBot is a simple Discord bot written with the Discord.js framework and Node.js runtime. It is designed to post an image link every time a command is called and allows for uploading of images taking advantage of Discord's CDN for image hosting. Image links are hosted and read from/updated to a MongoDB Atlas database, a NoSQL database solution.

## Why is jobiebot?

This is handsdown my favorite personal project that I've made so far. I created this as a sort of gift for my girlfriend. It was designed to help her with the fact that she had recently moved away from home and wouldn't be able to see her beloved cat. As a way to cheer her up I asked her for as many pics of her cat as she could find and I created this.

## Final thoughts

I imagine coding as a craft. Just like someone would use their woodworking skills or their art skills to make a handmade gift I was able to use my very limited programming skills to make a handmade gift. Programming is my way of expressing myself and my creativity and it's my way of creating something that can touch or improve the lives of others.

## How to download

This is not a project that I expect anyone ot use, it boils down to a bot that sounds pictures and plays audio. However if you think it would be useful to get a footing on coding Discord bots as a whole then here are the intstructions:

```Bash

git clone https://github.com/Blugil/jobiebot.git

cd jobiebot

npm install

#Configure the .env file, adjust the database string in ./db/mongo.js

npm start
```
