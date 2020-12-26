const commando = require('discord.js-commando');


class Recent extends commando.Command {
    constructor(client) {
        super(client, {
            name: "log",
            group: "complex",
            memberName: "log",
            description: "Turns message logging on or off"
        });
    }

    async run(message, args) {

        
    }
}

module.exports = Recent;