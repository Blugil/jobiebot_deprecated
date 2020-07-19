module.exports = async function(mongo) {
    try {
        await mongo.connect();
        console.log("Connected correctly to server");
        
    } catch (err) {
        console.log(err.stack);
    }
}

