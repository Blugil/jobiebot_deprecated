const commando = require('discord.js-commando');
const mongo = require('../../db/mongo');
const getImages = require('../../db/get_images');

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

        //calls getImages to create an array of imamge links
        let images = await getImages(mongo, db_name, collection_name);

        //checks if images is not null and length is > 0
        if (images !== null && images.length > 0) {

            //creates a random number based on array size
            let random = Math.floor(Math.random() * (images.length - 1));

            //sends a message with a link from the random index of our images array
            await message.channel.send(`Hi ${message.author} i love you! enjoy this cute pic of me that my lovely wife took ${images[random]}`);
        } else {

            //sends an error message if the array is null or = o
            await message.channel.send(`Hi ${message.author}, somehow there are no jobie pics right now! Try adding one and using this command again.`)
        }
    }
}



module.exports = Pic;