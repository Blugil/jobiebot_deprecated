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

                await message.channel.send(`${message.author} please enter the player you are challenging to tictactoe: `);
                
                let challenge = true;
                while (challenge) {
                    this.client.once('message', (message) => {

                        console.log(message.content);


                        challenge = false;
                    })
                    
                    break;

                    if (challenge) {
                        message.channel.send(`${message.author}, please mention a user in the server.`)
                    }
                } 
                break;
        }
    }
}

module.exports = Play;