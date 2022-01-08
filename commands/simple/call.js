const commando = require('discord.js-commando');
const time_display = require('../../util/time_display');
const fs = require('fs');
const path = require('path');

class Call extends commando.Command {
    constructor(client) {
        super(client, {
            name: "call",
            group: "simple",
            memberName: "call",
            description: "sends the current length of the current call if there are more than two people"
        });
    }

    async run(message, args) {

		console.log(args[0]);

		let call_state = JSON.parse(fs.readFileSync(path.join(__dirname, "../../call.json")));

		if (args == "record") {
			let record = "call_record" in call_state ? call_state["call_record"] : 0;
			if (record == 0) {
				await message.channel.send("There is no current call record!");
				return;
			}
			await message.channel.send(`The current call record is: ${time_display(record)}!`);
			return;
		}

		let call_start = "call_start" in call_state ? new Date(call_state["call_start"]) : 0;
		let current_date = new Date();

		if (call_start == 0) {
			await message.channel.send("There is currently no active call!");
		}
		else {
			await message.channel.send(`There has been a call going for: ${time_display(current_date - call_start)}!`);
		}
		
    }
}

module.exports = Call;