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

//generates permissions.json file at program initial start
generatePermissions();

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

    let current_in_voice = 0;
    voice.member.voice.channel.members.forEach((member) => {
        current_in_voice += 1
    });
    console.log(current_in_voice);

    let call = JSON.parse(fs.readFileSync(path.join(__dirname, "./call.json")));

    let previous_in_voice = call[message.guild.id][current_in_voice];

    call[message.guild.id] = {
        current_in_voice: current_in_voice,
    }
    //writes new object to file

    if(current_in_voice >= 2 && previous_in_voice <= 1) {
        call["join_time"] = {
            "start_date": Date.now(),
            "curr_date": Date.now(),
        }
    }
    else if(current_in_voice >= 2) {
        call["join_time"] = {
            "curr_date": Date.now(),
        }
    }
    else if (current_in_voice <= 1 && previous_in_voice >= 2) {
        call["join_time"] = {
            "curr_date": Date.now(),
            "end_date": Date.now(),
        }

        if (call["join_time"].hasOwnProperty("start_date")) {
            console.log(call["join_time"]["end_date"] - call["join_time"]["start_date"]);
        }
        else {
            console.log("weird bug, no starting date");
        }
    }

    fs.writeFileSync(path.join(__dirname, "./call.json"), JSON.stringify(call), (err) => {
        if (err) 
            console.log(err);
    })
})
client.login(token);
