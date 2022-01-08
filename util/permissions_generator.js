const path = require('path');
const fs = require('fs');

//checks if there is a permissions.json file by trying to read it and if there's an error creates an empty permissions.json file instead
module.exports = function(name) {
    try {
        fs.readFileSync(path.join(__dirname, `../${name}.json`))
    } catch (err) {
        let data = {};
        fs.writeFileSync(path.join(__dirname, `../${name}.json`), JSON.stringify(data), (err) => {
            console.log(err);
        })
    }
}