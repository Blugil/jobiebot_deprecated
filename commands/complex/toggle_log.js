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

                let permissions = JSON.parse(fs.readFileSync(path.join(__dirname, "../../permissions.json")));

                permissions[message.guild.id] = {
                    log: args,
                }

                fs.writeFileSync(path.join(__dirname, "../../permissions.json"), JSON.stringify(permissions), (err) => {
                    if (err) console.log(err);
                })
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