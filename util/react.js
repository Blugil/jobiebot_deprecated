//checks if message contains one of two strings and is in the desired channel then reacts to that message with an emoji
module.exports = function(message, channelID) {
    if ((message.content.includes('odie') || message.content.includes('jobie')) && message.channel.id == channelID) {
        try {
            message.react('505132652437700642');            
        }
        catch(e) {
            console.log(e);
        }
    }
}

