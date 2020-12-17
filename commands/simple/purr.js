const commando = require('discord.js-commando');
const ytdl = require('ytdl-core');


class Purr extends commando.Command {
    constructor(client) {
        super(client, {
            name: "purr",
            group: "simple",
            memberName: "purr",
            description: "The bot joins the voice channel and plays a purring sound"
        });
    }

    async run(message) {
        //pulls the voice object from the member object
        const { voice } = message.member;

        //splits the args string starting after the command prefix
        const args = message.content.slice(this.client.commandPrefix.length).trim().split(' ');
        //sets variable time to either the value of the second arg or 10 
        const time = (args[1] && Number.isInteger(parseInt(args[1])) ? args[1] : 10);
        //checks if user is in voice
        if (voice.channelID) {
            //joins the channel, returns a promise and a connection object
            await voice.channel.join().then((connection) => {

                //url of youtube video to play
                let url = "https://www.youtube.com/watch?v=CY7t8ow2gOM&t=222s";

                message.channel.send(`Purring for about ${time} seconds uwu`);
                
                //plays the audio from a youtube video
                //the 'highWaterMark: 1 << 25' parameter fixed this, not sure why it didnt work but now it does...don't change it.
                connection.play(ytdl(url, {quality: 'highestaudio',
                highWaterMark: 1 << 25}));
               
            
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