const commando = require('discord.js-commando');
const random = require('../../util/random');
const mongo = require('../../db/db');
const getImages = require('../../db/dbGetImages');

const db_name = process.env.DB_NAME;
const collection_name = process.env.COLLECTION_NAME;

class Spam extends commando.Command {
    constructor(client) {
        super(client, {
            name: "spam",
            group: "simple",
            memberName: "spam",
            description: "summons 3 pictures of Odie, none of them are repeats"
        });
    }

    async run(message, args) {

        let jobies = await getImages(mongo, db_name, collection_name);
        let arr = random(jobies);

        if (arr !== null) {
            await message.channel.send(`HI ${message.author}! it seems like you need some extra jobies this time, i'm coming for cuddles but in the mean time i can give you some extra pics that my lovely wife took ${jobies[arr[0]]} ${jobies[arr[1]]} ${jobies[arr[2]]}`)
                .catch(function (e) {
                    console.log('Could not send the message');
                });
        } else {
            await message.channel.send(`Hi ${message.author}! It seems there currently aren't any jobies to send, try adding some with the '!jobie add + image' command!`)
                .catch(function (e) {
                    console.log('Could not send the message');
                });
        }
    }
}

module.exports = Spam;