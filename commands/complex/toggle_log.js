const commando = require('discord.js-commando');
const fs = require('fs');
const path = require('path');

class Log extends commando.Command {
    constructor(client) {
        super(client, {
            name: "log",
            group: "complex",
            memberName: "log",
            description: "Turns message logging on or off"
        });
    }

    async run(message, args) {
        if (message.member.hasPermission("MANAGE_GUILD")) {
            if (args == "true" || args == "false") {

                //opens the file to get permissions object
                let permissions = JSON.parse(fs.readFileSync(path.join(__dirname, "../../permissions.json")));

                //sets a new object with a key equal to the guild ID and toggles log between true and false
                permissions[message.guild.id] = {
                    log: args,
                }

                //writes new object to file
                fs.writeFileSync(path.join(__dirname, "../../permissions.json"), JSON.stringify(permissions), (err) => {
                    if (err) console.log(err);
                })

                //sends message confirming file write
                await message.channel.send("Logging permissions were updated");
            }
            else {
                await message.channel.send("Invalid arguments, please enter true or false to enable or disable message logging.");
            }
        }
        else {
            await message.channel.send("You do not have permission to use this command.")
        }
    }
}

module.exports = Log;