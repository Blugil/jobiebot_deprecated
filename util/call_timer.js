const fs = require('fs');
const path = require('path');


module.exports = function(voice) {
    let current_in_voice = voice.member.voice.channel ? voice.member.voice.channel.members.size : 0;
    console.log(current_in_voice);

    let call_state = JSON.parse(fs.readFileSync(path.join(__dirname, "../call.json")));

    let date = new Date();

    if (current_in_voice >= 2) {
        if (!("call_start" in call_state)) {
            call_state["call_start"] = date;
            console.log(call_state);
        }
    }
    else if (current_in_voice <= 1) {
        //makes sure just one person joining in and out doesn't excecute any code
        if (("call_start" in call_state)) {
            let end_date = new Date();
            let start_date = new Date(call_state["call_start"]);
            let call_time = end_date - start_date;

            console.log(end_date - start_date);
            
            // sets the call length record if current ended call just exceeded it
            if ("call_record" in call_state) {
                if (call_state["call_record"] < call_time) {
                    call_state["call_record"] = call_time;
                }
            }
            else {
                call_state["call_record"] = call_time;
            }

            delete call_state["call_start"];
        }
    }

    fs.writeFileSync(path.join(__dirname, "../call.json"), JSON.stringify(call_state), (err) => {
        if (err) 
            console.log(err);
    })

    //if there are two or more people in call and the call state changes to > 2
        //do nothing
    //if there are two or more people in the call and the call state changes to < 2
        //get current time and subtract start time
        //clear start time
}