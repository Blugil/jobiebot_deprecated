module.exports = function(times) {

	let time_dict = {};
	
	//converts input into seconds
	let time = times / 1000;
	let days = 60 * 60 * 24;
	let hours = 60 * 24;
	let minutes = 60;

	time_dict["days"] = Math.floor(time / days);
	time = time - time_dict["days"] * days;

	time_dict["hours"] = Math.floor(time / hours);
	time = time - time_dict["hours"] * hours;

	time_dict["minutes"] = Math.floor(time / minutes);
	time = time - time_dict["minutes"] * minutes;

	time_dict["seconds"] = Math.floor(time);

	let string = "";
	string = time_dict["days"] > 0 ? time_dict["days"] + " days " : "";
	string = time_dict["hours"] > 0 ? string + time_dict["hours"] + " hours ": string + "";
	string = time_dict["minutes"] > 0 ? string + time_dict["minutes"] + " minutes ": string + "";
	string = time_dict["seconds"] > 0 ? string + time_dict["seconds"] + " seconds": string + "";

	return string;

}