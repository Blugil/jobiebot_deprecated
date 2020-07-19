const { MongoClient } = require("mongodb");
require('dotenv').config()
 
// Replace the following with your Atlas connection string                                                                                  
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@jobiebot.jihxg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const mongo = new MongoClient(url, { useUnifiedTopology: true });

module.exports = mongo;