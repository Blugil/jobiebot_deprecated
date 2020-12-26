let users = require('../config.json')
require('dotenv').config()


module.exports = function logMessage(message) {
    if (message.author == users["User1"] || message.author == users["User2"]) {
        /**
         * TODO: create function that adds a new collection if the collection doesnt exist with the users name as the collection name and a log of their messages that is added too on each message
         */
    }
}
