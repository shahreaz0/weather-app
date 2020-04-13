const request = require("request");
require("dotenv").config();

const geoLocation = (address, callback) => {
	const location = encodeURIComponent(address);
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${process.env.MB_TOKEN}&limit=1`;
	//console.log(url);

	request({ url, json: true }, (error, { body, statusCode } = {}) => {
		if (!error && statusCode === 200 && body.features.length > 0) {
			const data = {
				longitude: body.features[0].center[0],
				latitude: body.features[0].center[1],
				address: body.features[0].place_name,
			};
			callback(undefined, data);
			//console.log(response.body.features[0].center[0]);
			//console.log(response.body.features[0].center[1]);
		} else {
			callback("Geolocation data not found.", undefined);
		}
	});
};

module.exports = geoLocation;
