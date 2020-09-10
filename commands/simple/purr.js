const commando = require('discord.js-commando');
const ytdl = require('ytdl-core');
const discordclient = require('../../index');

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
        //creates dispatcher variable;
        let dispatcher;
        //gets the command prefix length
        let commandPrefix = discordclient.commandPrefix.length;
        //splits the args string starting after the command prefix
        const args = message.content.slice(commandPrefix).trim().split(' ');
        //checks if there is an arg, set time to value if yes, set time to 10000 if no
        const time = (args[1] && Number.isInteger(parseInt(args[1])) ? args[1] : 10000);
        //checks if user is in voice
        if (voice.channelID) {
            //joins the channel, returns a promise and a connection object
            await voice.channel.join().then((connection) => {
                //plays the audio from a youtube video, needs ytdl to play file
                dispatcher = connection.play(ytdl("https://www.youtube.com/watch?v=CY7t8ow2gOM&t=2", { volume: 0.1 }))
            }).catch((error) => {
                console.log(error);
            });
            setTimeout(() => {
                try {
                    dispatcher.destroy();
                    voice.channel.leave();
                }
                catch (error) {
                    console.log(error);
                }
            }, time);
        } else {
            //let user know if they aren't in voice
            await message.channel.send(`Hello, ${message.author}! Jobie can't purr unless his favorite people are with him uwu. Connect to voice so u can listen`);
        }


    }
}



module.exports = Purr;