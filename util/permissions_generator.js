const path = require('path');
const fs = require('fs');

//checks if there is a permissions.json file by trying to read it and if there's an error creates an empty permissions.json file instead
module.exports = function() {
    try {
        fs.readFileSync(path.join(__dirname, "../permissions.json"))
    } catch (err) {
        let data = {};
        fs.writeFileSync(path.join(__dirname, "../permissions.json"), JSON.stringify(data), (err) => {
            console.log(err);
        })
    }
}