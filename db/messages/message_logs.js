const {log_users} = require('../../config.json')
const path = require('path');
const fs = require('fs');   




require('dotenv').config()


module.exports = async function(message, mongo, dbName) {

    //gets message authors id
    let author = (message.author.id).toString();

    //reads the permissions from the permissions.json file
    let permissions = JSON.parse(fs.readFileSync(path.join(__dirname, "../../permissions.json")));

    //sets log_permissions equal to the value at the specified key or false if the key doens't exist
    let log_permissions = permissions[message.guild.id] ? permissions[message.guild.id]["log"] : false;

    //loops through all keys in log_users
    for (let key in log_users) {

        if(log_users.hasOwnProperty(key)) {

            //if message author matches a value
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
