const {log_users} = require('../../config.json')
const permissions = require('../../permissions.json');    



require('dotenv').config()


module.exports = async function(message, mongo, dbName) {

    let author = (message.author.id).toString();
    let log_permissions = permissions[message.guild.id] ? permissions[message.guild.id]["log"] : false;

    for (let key in log_users) {

        if(log_users.hasOwnProperty(key)) {

            if (author == log_users[key] && log_permissions == "true") {

                //creates instnace of database collection
                const col = mongo.db(dbName).collection(log_users[key]);
        
                //inserts a message using this schema
                await col.insertOne(
                    {
                        author: log_users[key],
                        message: message.content
                    }
                ).catch(err => {
                    console.log("There was an error: " + err);
                })

                return;
            }
        }
    }
}
