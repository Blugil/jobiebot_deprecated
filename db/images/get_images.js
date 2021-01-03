/**
 * function that returns the array of images stored in my database
 * @param {Mongo Client} mongo mongo database client
 * @param {String} dbName name of the database the client is connected to
 * @param {String} collectionName name of the string collection within the database who's data is being accessed
 * @returns {Array}
 */
module.exports = async function (mongo, dbName, collectionName) {
    try {
        const col = mongo.db(dbName).collection(collectionName);
        const myDoc = await col.findOne({
            images: Array
        });

        if (myDoc) {
            let array = myDoc.images;
            return array;
        }
        return null;

    } catch (err) {
        console.log(err.stack);
        return null;
    }
}