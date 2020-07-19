const commando = require('discord.js-commando');
const mongo = require('../../db/db');
const getImages = require('../../db/dbGetImages');

const db_name = process.env.DB_NAME;
const collection_name = process.env.COLLECTION_NAME;

class Pic extends commando.Command {
    constructor(client) {
        super(client, {
            name: "pic",
            group: "simple",
            memberName: "pic",
            description: "Sends a picture of my girlfriends cat Odie chosen at random from a large pool"
        });
    }

    async run(message, args) {

        let jobies = await getImages(mongo, db_name, collection_name);

        if (jobies !== null && jobies.length > 0) {
            let random = Math.floor(Math.random() * (jobies.length - 1));

            await message.channel.send(`Hi ${message.author} i love you! enjoy this cute pic of me that my lovely wife took ${jobies[random]}`);
        } else {
            await message.channel.send(`Hi ${message.author}, somehow there are no jobie pics right now! Try adding one and using this command again.`)
        }
    }
}



module.exports = Pic;