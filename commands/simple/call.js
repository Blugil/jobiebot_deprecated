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

		let call_state = JSON.parse(fs.readFileSync(path.join(__dirname, "../../call.json")));

		let call_start = "call_start" in call_state ? new Date(call_state["call_start"]) : 0;
		let current_date = new Date();

		if (call_start == 0) {
			await message.channel.send("There is currently no active call!");
		}
		else {
			let time_dict = time_display(current_date - call_start);
			let string = "";
			string = time_dict["days"] > 0 ? time_dict["days"] + " days " : "";
			string = time_dict["hours"] > 0 ? string + time_dict["hours"] + " hours ": string + "";
			string = time_dict["minutes"] > 0 ? string + time_dict["minutes"] + " minutes ": string + "";
			string = time_dict["seconds"] > 0 ? string + time_dict["seconds"] + " seconds": string + "";

			await message.channel.send(`There has been a call going for: ${string}`);
		}
		
    }
}

module.exports = Call;