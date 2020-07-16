const commando = require('discord.js-commando');

class Add extends commando.Command {
    constructor(client) {
        super(client, {
            name: "add",
            group: "complex",
            memberName: "add",
            description: "Adds an image to the images database"
        });
    }

    async run(message, args) {

        let array = message.attachments.array();

        if (array.length > 0) {
            
            array.forEach(function(attachment) {
                console.log(`${attachment.url} \n`);
                
            });
        }
       
        
    }
}

module.exports = Add;