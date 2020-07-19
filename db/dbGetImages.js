//function that returns the array of images stored in my database
module.exports = async function(mongo, dbName, collectionName) {
    try {
        const db = mongo.db(dbName);
        const col = db.collection(collectionName);
        const myDoc = await col.findOne(
            { images: Array }
        );
        
        if (myDoc) {
            let jobies = myDoc.images;
            return jobies;
        }

        return null;

    } catch (err) {
        console.log(err.stack);
    }
}

