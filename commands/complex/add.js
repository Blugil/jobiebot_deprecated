const commando = require('discord.js-commando');
const getImages = require('../../db/images/get_images');
const addImages = require('../../db/images/update_images');
const mongo = require('../../db/mongo');    
const { db } = require('../../config.json');
const { images } = db.collections;

require('dotenv').config();

const db_name = process.env.DB_NAME;
const collection_name = images

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

        switch (command) {
            case "image":
                
                //sets attachments equal to an array of discord message attachments
                let attachments = message.attachments.array();

                //sets images equal to an array of image links stored on a database
                let images = await getImages(mongo, db_name, collection_name);

                //checks if there are attachments in the message 
                if (attachments.length > 0) {

                    //pushes the urls from the message attachments to the image links array  
                    attachments.forEach(attachment => {
                        let url = attachment.url;
                        images.push(url);
                    });

                    //calls addImages to upload the new array of images to the database
                    await addImages(mongo, db_name, collection_name, images).then(
                        //sends success message in discord
                        await message.channel.send(`You attached ${attachments.length} images and I've worked some magic to upload all of them to the database.`)

                    ).catch(function (e) {
                        console.error('There was an error: ' + e);
                    });
                } 
        
                else {
                    await message.channel.send('No image attached! Try this command again with an image attachment.');
                } 
                break;
        
            default:
                await message.channel.send(`${command} is not a valid command, please enter a valid command.`)
                break;
        }

        
    }
}

module.exports = Add;