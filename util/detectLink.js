/**
 * @todo write the bloody thing
 * @param {String} string string
 */
module.exports = function(string) {
    if (string.includes("http://") || string.includes("https://")) {
        return true;
    } 
    else {
        return false;
    }
}