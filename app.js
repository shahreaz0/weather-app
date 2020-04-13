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

app.get("/", (req, res) => {
	//console.log(req.query.address);
	if (req.query.address) {
		geoLocation(req.query.address, (error, geoData) => {
			if (error) {
				return res.render("error", { title: "Error", error });
			}
			//console.log(latitude, longitude);
			weather(
				geoData.latitude,
				geoData.longitude,
				(error, weatherData) => {
					if (error) {
						return res.render("error", { title: "Error", error });
					}
					const allData = { ...weatherData, ...geoData };
					res.render("home", {
						title: "home",
						data: allData,
					});
				},
			);
		});
	} else {
		res.render("home", {
			title: "Home",
			data: undefined,
		});
	}
});

app.get("/weather", (req, res) => {
	if (!req.query.address) {
		return res.send({ error: "There no query." });
	}
	//console.log(req.query.address);
	geoLocation(req.query.address, (error, geoData) => {
		if (error) {
			return res.send({ error });
		}
		//console.log(latitude, longitude);
		weather(geoData.latitude, geoData.longitude, (error, weatherData) => {
			if (error) {
				return res.send({ error });
			}
			const allData = { ...weatherData, ...geoData };
			res.send(allData);
		});
	});
});

app.get("*", (req, res) => {
	res.status("404").send({ data: "undefined route", status: 404 });
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
