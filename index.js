const Commando = require('discord.js-commando');
//database imports
const mongo = require('./db/mongo');
const dbConnect = require('./db/mongoconnect')
//utility imports
const react = require('./util/react');
const logMessage = require('./db/messages/message_logs');
const path = require('path');
require('dotenv').config();

const {emote, prefix, owner} = require("./config.json");
const generatePermissions = require('./util/permissions_generator');
const token = process.env.TOKEN;
const dbName = process.env.DB_NAME;
const fs = require('fs');
const { start } = require('repl');
const call_timer = require('./util/call_timer');

//generates permissions.json file at program initial start
generatePermissions("permissions");
generatePermissions("call");

//instantiates a new comando client with !jobie as command prefix and autoreconnect set to true
const client = new Commando.Client(({
    owner: owner,
    commandPrefix: prefix,
    autoReconnect: 'true'
}));

//registers the commands
client.registry.registerGroups(
    [
        ['simple', 'Basic bot commands'],
        ['complex', 'More complex stuff'],
        ['audio', 'Audio related commands'],
        ['games', 'Fun two-player games to play'] 
    ])
.registerDefaults()
.registerCommandsIn(path.join(__dirname, "commands"));

//generates permissions.json file if it doesn't exist in directory

//bot on ready function, logs ready and attempts to set status 
client.on('ready', () => {
    console.log("Bot is connected");
    dbConnect(mongo);
    client.user.setActivity('the rain', {
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
    //reacts to messages containing 'odie' or 'jobie'
    react(message, emote);
    //logs messages
    //logMessage(message, mongo, dbName);
});
client.on('voiceStateUpdate', (voice) => {
    call_timer(voice, client);
})
client.login(token);
