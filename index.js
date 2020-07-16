const Commando = require('discord.js-commando');
const react = require('./util/react')
const path = require('path')

require('dotenv').config();

let token = process.env.TOKEN;
let channelID = process.env.CHANNEL_ID;

//instantiates a new comando client with !jobie as command prefix and autoreconnect set to true
const client = new Commando.Client(({
    owner: '193836298597826561',
    commandPrefix: '!jobie',
    autoReconnect: 'true'
}));


//registers the commands under the simple directory
client.registry.registerGroups(
    [['simple', 'simple'], 
    ['complex', 'complex']])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, "commands"));

//bot on ready function, logs ready and attempts to set status 
client.on('ready', function () {
    console.log("Bot is connected");
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
    react(message, channelID)
});


client.login(token);