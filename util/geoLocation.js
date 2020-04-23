const axios = require("axios").default;
require("dotenv").config();

const geoLocation = async (address) => {
	const location = encodeURIComponent(address);
	const option = {
		url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json`,
		params: {
			access_token: process.env.MB_TOKEN,
			limit: 1,
		},
	};

	try {
		const res = await axios(option);
		if (res.data.features.length) {
			const data = {
				longitude: res.data.features[0].center[0],
				latitude: res.data.features[0].center[1],
				address: res.data.features[0].place_name,
				hasLocation: true,
			};
			return data;
		} else {
			return {
				longitude: undefined,
				latitude: undefined,
				address: undefined,
				hasLocation: false,
			};
		}
	} catch (error) {
		throw "Location API server is down. Try Again.";
	}
};

module.exports = geoLocation;
