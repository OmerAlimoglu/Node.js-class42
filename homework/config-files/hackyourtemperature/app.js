import express from "express";
import fetch from "node-fetch";
import { API_KEY } from "./sources/keys.js";

const app = express();

app.use(express.json());

app.post("/weather", (req, res) => {
  const cityName = req.body.cityName;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === "404") {
        res.send({ weatherText: "City is not found!" });
      } else {
        const temperature = data.main.temp;
        const celsius = Math.round(temperature - 273.15);
        const weatherText = `The temperature in ${cityName} is ${celsius} degrees Celsius.`;
        res.send({ weatherText });
      }
    })
    .catch((error) => {
      console.log(error);
      res.send({ weatherText: "Error occurred while fetching weather data." });
    });
});

app.use(function (req, res, next) {
  res.status(404).send("Sorry, we cannot find the city!");
});

export default app;
