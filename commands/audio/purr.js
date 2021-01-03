const commando = require('discord.js-commando');
const ytdl = require('ytdl-core');
const getAudio = require('../../db/audio/get_audio');
const mongo = require('../../db/mongo');
const { db } = require('../../config.json');
const { purring_link } = db.collections;
const dbName = process.env.DB_NAME;

class Purr extends commando.Command {
    constructor(client) {
        super(client, {
            name: "purr",
            group: "audio",
            memberName: "purr",
            description: "The bot joins the voice channel and plays a purring sound",
            guildOnly: true
        });
    }

    async run(message) {
        
        const { voice } = message.member;

        //splits the args string starting after the command prefix
        const args = message.content.slice(this.client.commandPrefix.length).trim().split(' ');

        //sets variable time to either the value of the second arg or 10 
        const time = (args[1] && Number.isInteger(parseInt(args[1])) ? args[1] : 10);

        //checks if user is in voice
        if (voice.channelID) {

            //url of youtube video to play
            const url = await getAudio(mongo, dbName, purring_link);

            //joins the channel, returns a promise and a connection object
            await voice.channel.join().then((connection) => {

                if (url) {

                    message.channel.send(`Purring for ${time} seconds uwu`);
                    
                    //plays the audio from a youtube video
                    //the 'highWaterMark: 1 << 25' parameter fixed this, not sure why it didnt work but now it does...don't change it.
                    connection.play(ytdl(url, {quality: 'highestaudio',
                    highWaterMark: 1 << 25}));
                }
                else {
                    console.log("Unable to find link to purring, leaving channel");
                    voice.channel.leave();
                }
            
            }).catch((error) => {
                console.log(error);
            });

            //sets a timeout for the bot to disconnect after the specified amount of time or 10 seconds if no time was specified
            setTimeout(() => {
                try {
                    voice.channel.leave();
                }
                catch (error) {
                    console.log(error);
                }
            }, time * 1000);
        } else {
            //let user know if they aren't in voice
            await message.channel.send(`Hello, ${message.author}! Jobie can't purr unless his favorite people are with him uwu. Connect to voice so u can listen`);
        }
    }
}

module.exports = Purr;