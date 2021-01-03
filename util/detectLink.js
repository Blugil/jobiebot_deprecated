/**
 * @todo write the bloody thing
 * @param {String} string string
 */
module.exports = function(link) {
    if (link.includes("https://www.youtube.com")) {
        return true;
    } 
    else {
        return false;
    }
}