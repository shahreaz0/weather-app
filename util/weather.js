const axios = require("axios");
require("dotenv").config();

const weather = (latitude, longitude) => {
	return new Promise((resolve, reject) => {
		const option = {
			url: `http://api.weatherunlocked.com/api/current/${latitude},${longitude}`,
			params: {
				app_id: process.env.WU_API_ID,
				app_key: process.env.WU_API_KEY,
			},
		};

		axios(option)
			.then((res) => {
				const data = {
					temp_c: res.data.temp_c,
					humid: res.data.humid_pct,
				};
				resolve(data);
			})
			.catch((err) => reject("Weather API server is down. Try Again."));
	});
};

module.exports = weather;

// const weather = (latitude, longitude, callback) => {
// 	const url = `http://api.weatherunlocked.com/api/current/${latitude},${longitude}?app_id=${process.env.WU_API_ID}&app_key=${process.env.WU_API_KEY}`;
// 	//console.log(weatherURL);
// 	request({ url, json: true }, (error, { body, statusCode } = {}) => {
// 		if (!error && statusCode === 200) {
// 			const data = {
// 				temp_c: body.temp_c,
// 				humid: body.humid_pct,
// 			};
// 			callback(undefined, data);
// 			//console.log("Temperature: " + response.body.temp_c);
// 			//console.log("Humid: " + response.body.humid_pct);
// 		} else {
// 			callback("Weather data not found.", undefined);
// 		}
// 	});
// };
