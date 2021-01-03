module.exports = async function(mongo, dbName, collectionName) {

    const col = mongo.db(dbName).collection(collectionName);
    try {
        //queries database for document 
        let myDoc = await col.findOne({
            video_link : String,
        })

        if(myDoc) {
            let video_link = myDoc.video_link;
            return video_link;
        }
        return null;
        
    } catch (error) {
        console.log(error);       
        return null;
    }
}