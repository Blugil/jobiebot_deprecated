const Commando = require('discord.js-commando');

//database imports
const mongo = require('./db/mongo');
const dbConnect = require('./db/mongoconnect')

//utility imports
const react = require('./util/react');
const logMessage = require('./db/messages/message_logs');

const path = require('path');
require('dotenv').config()


const token = process.env.TOKEN;

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
client.on('ready', () => {
    console.log("Bot is connected");
    dbConnect(mongo);
    client.user.setActivity('the thunder', {
        type: 'LISTENING'
    }).catch(err => {
        console.error('There was an error updating status: ' + err);

    })
});

//logs bot disconnected on bot disconnect
client.on('disconnected', () => {
    console.log("disconnected")
})

//on message function
client.on('message', (message) => {
    react(message, emote);
    logMessage(message, mongo, process.env.DB_NAME)
});

client.login(token);

module.exports = client;