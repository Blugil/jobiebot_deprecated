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

                await message.channel.send(`${message.author} please mention the player you are challenging to tictactoe within 30 seconds: `);
                //make something like this that loops to check for message replies
                //while loop causes heap overflow from creating so many listeners
                this.client.once('message', (message) => {

                    let mentioned_users = [];
                    
                    //maps mentioned users to array
                    message.mentions.users.forEach((user) => {
                        array.push(user.id);
                    });
                    //makes sure only one user is mentioned
                    if (mentioned_users.length != 1) {
                        message.channel.send(`${message.author}, you can only challenge one user.`);
                        this.challenge(mentioned_users);
                    }
                    else {
                        message.channel.send(`You've challenged someone`);
                        return mentioned_users;
                    }
                })

                break;

            default:
                await message.channel.send(`${message.author} there are no games with this name`)
                break;
        }
    }
}

module.exports = Play;