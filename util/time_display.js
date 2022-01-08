module.exports = function(times) {

	let time_dict = {};
	

	//converts input into seconds
	let time = times / 1000;
	let days = 60 * 60 * 24;
	let hours = 60 * 24;
	let minutes = 60;

	console.log(time);


	time_dict["days"] = Math.floor(time / days);
	time = time - time_dict["days"] * days;

	time_dict["hours"] = Math.floor(time / hours);
	time = time - time_dict["hours"] * hours;

	time_dict["minutes"] = Math.floor(time / minutes);
	time = time - time_dict["minutes"] * minutes;

	time_dict["seconds"] = Math.floor(time);

	// time_dict["days"] = days % time == days ? days % time : 0;
	// time = time - (time_dict["days"] * days);

	// time_dict["hours"] = hours % time == hours ? hours % time : 0;
	// time = time - (time_dict["hours"] * hours);

	// time_dict["minutes"] = minutes % time == minutes ? minutes % time : 0;
	// time = time - (time_dict["minutes"] * minutes);

	// time_dict["seconds"] = time;

	console.log(time_dict);

	return time_dict;

}