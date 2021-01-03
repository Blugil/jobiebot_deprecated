const detect_link = require('../../util/detectLink');


//selects document using query and updates it to new information
module.exports = function(mongo, video_link, dbName, collectionName) {

    if (detect_link(video_link)) {

        const col = mongo.db(dbName).collection(collectionName)
        col.updateOne({
                //database query
                video_link: String    
            },
            {
                //makes a new doc if one doesn't exist
                //document update
                $set: {
                    video_link: video_link
                }
            },
            { 
                upsert: true,
        }).then(() => {
            console.log('Document updated');
            return 1;
        }).catch(err => {
            console.error('There was an error: ' + err);
            return 0;
        });
        return 1;
    }
    else {
        return 0;
    }
}