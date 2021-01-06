const commando = require('discord.js-commando');
const TicTacToe = require('../../games/tictactoe/tictactoe');

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
        let mentioned_users = [];

        message.mentions.users.forEach((user) => {
            mentioned_users.push(user.id);
        })

        if (mentioned_users.length != 1) {
            await message.channel.send(`${message.author} you mentioned ${mentioned_users.length} users, you need to mention 1, run the command again.`)
        }
        else {

            switch(game) {
                case 'tictactoe':
                    let playerOne = message.author.id;
                    let playerTwo = mentioned_users[0];

                    let tictactoe = new TicTacToe(playerOne, playerTwo);
                    let game_state = tictactoe.printGame();
                    message.channel.send(`${game_state}`);

                    console.log(tictactoe.makeMove(playerTwo, 'a0'));
                    console.log(tictactoe.makeMove(playerOne, 'b1'));
                    console.log(tictactoe.makeMove(playerTwo, 'a1'));
                    console.log(tictactoe.makeMove(playerOne, 'b0'));
                    console.log(tictactoe.makeMove(playerOne, 'a2'));
                    
                    break;

                default:
                    message.channel.send(`${message.author} there are no games with this name`)
                    break;
            }
        }
    }
}

module.exports = Play;