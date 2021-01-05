const commando = require('discord.js-commando');


class Play extends commando.Command {
    constructor(client) {
        super(client, {
            name: "play",
            group: "games",
            memberName: "play",
            description: "The hub for playing games.",
            guildOnly: true,
            argsType: "multiple"
        });
    }

    async run(message, args) {

        let game = args[0];
        switch(game) {
            
            case 'tictactoe':

                //scrapping the original idea and working on something new
                //old idea was bad and functioned poorly new idea wont be :)

                break;

            default:
                await message.channel.send(`${message.author} there are no games with this name`)
                break;
        }
    }
}

module.exports = Play;