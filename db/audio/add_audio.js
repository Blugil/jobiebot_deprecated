const detect_link = require('../../util/detectLink');


//selects document using query and updates it to new information
module.exports = function(mongo, video_link, dbName, collectionName) {

    if (detect_link(video_link)) {

        const col = mongo.db(dbName).collectionName(collectionName)
        col.findOneAndUpdate({
            //database query
            video_link: String    
        }, { 
            //document update
            $set: {
                video_link: video_link
            }
        })
    }
    else {
        return 0;
    }
}