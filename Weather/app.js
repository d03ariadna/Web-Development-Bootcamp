const express = require("express");
const https = require("https");
const bodyP = require("body-parser");

const app = express();

var datas = [];

app.use(bodyP.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(express.static("views"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/weather.html");
})

app.post("/", function (req, res) {

    datas = [];

    let city = req.body.cityName;
    const apiKey = "3ddea79a46ee4f686a61f5f51f48db95#";
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=" + unit + "&appid=" + apiKey;

    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const d = JSON.parse(data);

            city = city + ", " + d.sys.country;
            datas.push(city);  //Add the name of the city to the array

            const temp = Math.floor(d.main.temp);
            datas.push(temp);  //Add temp to the array

            const desc = d.weather[0].description;
            datas.push(desc);  //Add desc to the array

            const icon = "http://openweathermap.org/img/wn/" + d.weather[0].icon + "@2x.png"
            datas.push(icon);  //Add the icon URL to the array

            // res.write("<h1>The temperature in " + city + " is " + temp + "°C</h1>");
            // res.write("<h3>The actual weather is " + desc + "</h3>");
            // res.write("<img src=" + icon + ">");
            // res.send();

            res.render("weather", { datas: datas });

        })
    })
})

app.listen(3000, function () {
    console.log("Server on port 3000");
})