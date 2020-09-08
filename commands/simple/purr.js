const commando = require('discord.js-commando');
const ytdl = require('ytdl-core');

module.exports = class Purr extends commando.Command {
    constructor(client) {
        super(client, {
            name: "purr",
            group: "simple",
            memberName: "purr",
            description: "The bot joins the voice channel and plays a purring sound"
        });
    }

    async run(message, args) {
        //pulls the voice object from the member object
        const { voice } = message.member;
        //checks if user is in a voice channel 
        if (voice.channelID) {
            //joins the channel, returns a promise and a connection object
            voice.channel.join().then((connection) => {
                //plays the audio from a youtube video, needs ytdl to play file
                connection.play(ytdl("https://www.youtube.com/watch?v=CY7t8ow2gOM&", { volume: 0.1 }));
            }).catch((error) => {
                console.log(error);
            });
        } else {
            //let user know if they aren't in voice
            await message.channel.send(`Hello, ${message.author}! Jobie can't purr unless his favorite people are with him uwu. Connect to voice so u can listen`);
        }
    }
}