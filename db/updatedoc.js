/**
 * function to update the database with a new array of images
 * @param {Mongo Client} mongo instanced mongo client
 * @param {String} dbName name of the database
 * @param {String} collectionName name of collection in the database
 * @param {Array} images array to be added to the document in the collection
 */
module.exports = async function (mongo, dbName, collectionName, images) {
    const db = mongo.db(dbName);
    const col = db.collection(collectionName);
    await col.findOneAndUpdate({
        images: Array
    }, {
        $set: {
            images: images
        }
    }).then(function () {
        console.log('Document updated');
    }).catch(e => {
        console.error('There was an error: ' + e);
    });
}