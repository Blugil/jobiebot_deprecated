const Commando = require('discord.js-commando');

//database imports
const mongo = require('./db/mongo');
const dbConnect = require('./db/mongoconnect')

//utility imports
const react = require('./util/react');
const path = require('path');
require('dotenv').config()


const token = process.env.TOKEN;
const channelID = process.env.CHANNEL_ID;

let emote = '505132652437700642';

//instantiates a new comando client with !jobie as command prefix and autoreconnect set to true
const client = new Commando.Client(({
    owner: '193836298597826561',
    commandPrefix: '!jobie',
    autoReconnect: 'true'
}));


//registers the commands
client.registry.registerGroups(
        [
            ['simple', 'simple'],
            ['complex', 'complex'],
            ['audio', 'audio']
        ])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, "commands"));

//bot on ready function, logs ready and attempts to set status 
client.on('ready', function () {
    console.log("Bot is connected");
    dbConnect(mongo);
    client.user.setActivity('the thunder', {
        type: 'LISTENING'
    }).catch(function (e) {
        console.error('There was an error updating status');

    })
});

//logs bot disconnected on bot disconnect
client.on('disconnected', function () {
    console.log("disconnected")
})

//on message function
client.on('message', function (message) {
    react(message, channelID, emote)
});


client.login(token);

module.exports = client;