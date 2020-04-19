const axios = require("axios").default;
require("dotenv").config();

const geoLocation = (address) => {
	return new Promise((resolve, reject) => {
		const location = encodeURIComponent(address);
		const option = {
			url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json`,
			params: {
				access_token: process.env.MB_TOKEN,
				limit: 1,
			},
		};
		axios(option)
			.then((res) => {
				const data = {
					longitude: res.data.features[0].center[0],
					latitude: res.data.features[0].center[1],
					address: res.data.features[0].place_name,
				};
				resolve(data);
			})
			.catch((err) => reject("Location API server is down. Try Again."));
	});
};

module.exports = geoLocation;

// const geoLocation = (address, callback) => {
// 	console.log(url);
// 	request({ url, json: true }, (error, { body, statusCode } = {}) => {
// 		if (!error && statusCode === 200 && body.features.length > 0) {
// 			const data = {
// 				longitude: body.features[0].center[0],
// 				latitude: body.features[0].center[1],
// 				address: body.features[0].place_name,
// 			};
// 			callback(undefined, data);
// 			//console.log(response.body.features[0].center[0]);
// 			//console.log(response.body.features[0].center[1]);
// 		} else {
// 			callback("Geolocation data not found.", undefined);
// 		}
// 	});
// };
