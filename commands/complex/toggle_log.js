const commando = require('discord.js-commando');
const fs = require('fs');
const path = require('path');

class Log extends commando.Command {
    constructor(client) {
        super(client, {
            name: "surprise",
            group: "complex",
            memberName: "surprise",
            description: "Activates and deactivates the special surprise",
            guildOnly: true,
            ownerOnly: true,
        });
    }

    //this is unbelievably bad code do not use this PLEASE
    async run(message, args) {

        if (args == "true" || args == "false") {

            //opens the file to get permissions object
            //NOTE: permissions.json always exists as it's created at initial run
            let permissions = JSON.parse(fs.readFileSync(path.join(__dirname, "../../permissions.json")));

            //sets a new object with a key equal to the guild ID and toggles log between t and f                    
            permissions[message.guild.id] = {
                log: args,
            }
            //writes new object to file
            fs.writeFileSync(path.join(__dirname, "../../permissions.json"), JSON.stringify(permissions), (err) => {
                if (err) 
                    console.log(err);
            })
            //sends message confirming change
            if (args == "true") await message.channel.send("Surprise activated");
            else await message.channel.send("Surprise deactivated");

        } else await message.channel.send("Invalid arguments, please enter true or false to enable or disable the surprise.");
    }
}

module.exports = Log;