const path = require("path");
const express = require("express");
const app = express();

const weather = require("./util/weather");
const geoLocation = require("./util/geoLocation");

/**
 * ==============================
 * Express Config
 * ==============================
 */
//set views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//static files
app.use(express.static(path.join(__dirname, "public")));

/**
 * ==============================
 * Routers
 * ==============================
 */

app.get("/", async (req, res) => {
	if (!req.query.address) {
		return res.render("home", {
			title: "Home",
			data: undefined,
			path: "/",
		});
	}
	//async
	try {
		const geoData = await geoLocation(req.query.address);
		let weatherData;
		if (geoData.hasLocation) {
			weatherData = await weather(geoData.latitude, geoData.longitude);
		}
		const data = { ...geoData, ...weatherData };
		res.render("home", {
			title: "home",
			data,
			path: "/",
		});
	} catch (error) {
		console.log(error);
		res.render("error", {
			title: "Error",
			path: undefined,
			error,
		});
	}
});

app.get("/weather", async (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: "There no query.",
			fix: "add address query after /weather",
			example: "/weather?address=dhaka",
		});
	}

	try {
		let weatherData;
		const geoData = await geoLocation(req.query.address);
		if (geoData.hasLocation) {
			const weatherData = await weather(
				geoData.latitude,
				geoData.longitude,
			);
		}
		const data = { ...geoData, ...weatherData };

		res.send(data);
	} catch (error) {
		res.send({ err });
	}
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About",
		path: "/about",
	});
});

app.get("*", (req, res) => {
	res.status("404").send({
		data: "undefined route",
		status: 404,
	});
});

/**
 * ==============================
 * Server
 * ==============================
 */
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
	console.log("======================");
	console.log(`Listening at port ${PORT}`);
	console.log("======================");
});
