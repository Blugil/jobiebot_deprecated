const commando = require('discord.js-commando');
const fs = require('fs');
const path = require('path');

class Log extends commando.Command {
    constructor(client) {
        super(client, {
            name: "surprise",
            group: "complex",
            memberName: "surprise",
            description: "Activates and deactivates the special surprise"
        });
    }

    //this is unbelievably bad code do not use this PLEASE
    async run(message, args) {
        //checks if message has property memeber (detects if message comes from user in server)
        if (message.member) {

            if (message.member.hasPermission("MANAGE_GUILD")) {

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
            } else await message.channel.send("You do not have permission to use this command.")
        } else await message.channel.send("Can't use this command in a DM");
    }
}

module.exports = Log;