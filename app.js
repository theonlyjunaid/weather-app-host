const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const key = require(__dirname + "/key.js").key;
const port = process.env.PORT || 3000;
const baseURL = "https://api.openweathermap.org/data/2.5/";



const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home');
});

app.get("/check", (req, res) => {
    res.render('check');
});

app.get('/weather', (req, res) => {
    res.render('weather');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/working', (req, res) => {
    res.render('working');
});

app.post('/check', (req, res) => {
    const city = req.body.city;
    const requestURL = baseURL + `weather?q=${city}&appid=${key}`;
    request(requestURL, (err, response, body) => {
        if (err)
            console.log(err);
        else if (response.statusCode != 200) {
            res.send("Try Agin");
        }
        else {
            const data = JSON.parse(body);
            const weather = {
                temp: Math.round(parseFloat(data.main.temp) - 273.15),
                feels_like: Math.round(parseFloat(data.main.feels_like) - 273.15),
                humidity: data.main.humidity,
                pressure: data.main.pressure,
                city: data.name,
                country: data.sys.country,
                desc: capitalizeFirstLetter(data.weather[0].description),
                sunrise: convertTime(data.sys.sunrise),
                sunset: convertTime(data.sys.sunset),
                iconURL: `https://openweathermap.org/img/w/${data.weather[0].icon}.png`,
                wind: {
                    speed: Math.round(data.wind.speed * 3.6),
                    direction: data.wind.deg
                }
            };
            res.render('weather', { weather: weather });
        }
    });
});


app.listen(port, () => {
    console.log("Server started");
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function convertTime(unix_timestamp) {
    let date = new Date(unix_timestamp * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();
    let timeString = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    const [hourString, minute] = timeString.split(":");
    const hour = +hourString % 24;
    return (hour % 12 || 12) + ":" + minute + (hour < 12 ? "AM" : "PM");
}