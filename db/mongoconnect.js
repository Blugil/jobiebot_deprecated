/**
 * Connects the mongo client to the server
 * @param {Mongo Client} mongo an instance of the mongodb client
 */
module.exports = async function (mongo) {
    try {
        await mongo.connect();
        console.log("Connected correctly to server");

    } catch (err) {
        console.log(err.stack);
    }
}