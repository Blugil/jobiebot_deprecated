const commando = require('discord.js-commando');
const mongo = require('../../db/mongo');
const getImages = require('../../db/getdoc');

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

        //calls getImages to create an array of imamge links
        let jobies = await getImages(mongo, db_name, collection_name);

        //checks if images is not null and length is > 0
        if (jobies !== null && jobies.length > 0) {

            //sends a message with the most recent image uploaded
            await message.channel.send(`Hi ${message.author} this was the most recent picture added! ${jobies[jobies.length - 1]}`);
        } else {

            //sends message if the array is empty or null
            await message.channel.send(`Hi ${message.author}, somehow there are no jobie pics right now! Try adding one and using this command again.`)
        }
    }
}



module.exports = Recent;