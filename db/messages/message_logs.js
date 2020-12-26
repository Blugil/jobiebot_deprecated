
const {log_users} = require('../../config.json')

require('dotenv').config()


module.exports = async function(message, mongo, dbName) {

    let author = (message.author.id).toString();

    for (let key in log_users) {

        if(log_users.hasOwnProperty(key)) {

            if (author == log_users[key]) {
    
                // //creates instnace of database collection
                // const col = mongo.db(dbName).collection(log_users[key]);
        
                // //inserts a message using this schema
                // await col.insertOne(
                //     {
                //         author: log_users[key],
                //         message: message.content
                //     }
                // ).catch(err => {
                //     console.log("There was an error: " + err);
                // })

                return;
            }
        }
    }
}
