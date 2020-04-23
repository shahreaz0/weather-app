const axios = require("axios");
require("dotenv").config();

const weather = async (latitude, longitude) => {
	const option = {
		url: `http://api.weatherunlocked.com/api/current/${latitude},${longitude}`,
		params: {
			app_id: process.env.WU_API_ID,
			app_key: process.env.WU_API_KEY,
		},
	};
	try {
		const res = await axios(option);
		const data = {
			temp_c: res.data.temp_c,
			humid: res.data.humid_pct,
		};
		return data;
	} catch (err) {
		throw "Weather API server is down. Try Again.";
	}
};

module.exports = weather;
