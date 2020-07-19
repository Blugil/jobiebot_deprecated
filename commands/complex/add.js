const commando = require('discord.js-commando');
const getImages = require('../../db/dbGetImages');
const addImages = require('../../db/dbAddImage');
const mongo = require('../../db/db');

require('dotenv').config();

const db_name = process.env.DB_NAME;
const collection_name = process.env.COLLECTION_NAME;

class Add extends commando.Command {
    constructor(client) {
        super(client, {
            name: "add",
            group: "complex",
            memberName: "add",
            description: "Adds an image to the images database"
        });
    }

    async run(message, args) {


        let attachments = message.attachments.array();

        let jobies = await getImages(mongo, db_name, collection_name)
            .catch(function (e) {
                console.log('error getting images');
            });

        if (attachments.length > 0 && jobies !== null) {

            attachments.forEach(element => {
                let url = element.url;
                jobies.push(url);
            });

            await addImages(mongo, db_name, collection_name, jobies).then(
                await console.log(`${attachments.length} images uploaded successfully`),
                await message.channel.send(`You attached ${attachments.length} images and I've worked some magic to upload all of them to the database (yes I promise they're there).`)
            ).catch(function (e) {
                console.log('There was an error');
            });
        } else {
            await message.channel.send('No image attached! Try this command again with an image attachment.')
        }
    }
}

module.exports = Add;