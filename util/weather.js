const request = require("request");
require("dotenv").config();

const weather = (latitude, longitude, callback) => {
	const url = `http://api.weatherunlocked.com/api/current/${latitude},${longitude}?app_id=${process.env.WU_API_ID}&app_key=${process.env.WU_API_KEY}`;
	//console.log(weatherURL);

	request({ url, json: true }, (error, { body, statusCode } = {}) => {
		if (!error && statusCode === 200) {
			const data = {
				temp_c: body.temp_c,
				humid: body.humid_pct,
			};
			callback(undefined, data);
			//console.log("Temperature: " + response.body.temp_c);
			//console.log("Humid: " + response.body.humid_pct);
		} else {
			callback("Weather data not found.", undefined);
		}
	});
};

module.exports = weather;
