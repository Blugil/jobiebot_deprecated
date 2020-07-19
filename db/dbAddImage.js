module.exports = async function(mongo, dbName, collectionName, jobies) {
    const db = mongo.db(dbName);
        const col = db.collection(collectionName);
        await col.findOneAndUpdate(
            { images: Array },
            { $set : { images : jobies} }
        );
}