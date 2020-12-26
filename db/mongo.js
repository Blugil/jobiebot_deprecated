//creates an instance of the mongo db client with the database link
const {MongoClient} = require("mongodb");
require('dotenv').config()

//DB_STRING needs to be added to prod environment (this is a disgusting mess)
const url = process.env.DB_STRING || `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.CLUSTER_NAME}.jihxg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


const mongo = new MongoClient(url, {
    useUnifiedTopology: true
});

module.exports = mongo;