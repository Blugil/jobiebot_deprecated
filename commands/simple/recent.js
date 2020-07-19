const commando = require('discord.js-commando');
const mongo = require('../../db/db');
const getImages = require('../../db/dbGetImages');

const db_name = process.env.DB_NAME;
const collection_name = process.env.COLLECTION_NAME;

class Recent extends commando.Command {
    constructor(client) {
        super(client, {
            name: "recent",
            group: "simple",
            memberName: "recent",
            description: "Sends the most recently uploaded pic"
        });
    }

    async run(message, args) {

        let jobies = await getImages(mongo, db_name, collection_name);

        if (jobies !== null && jobies.length > 0) {

            await message.channel.send(`Hi ${message.author} this was the most recent picture added! ${jobies[jobies.length - 1]}`);
        } else {
            await message.channel.send(`Hi ${message.author}, somehow there are no jobie pics right now! Try adding one and using this command again.`)
        }
    }
}



module.exports = Recent;