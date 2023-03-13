import express from "express";
import exphbs from "express-handlebars";
import fetch from "node-fetch";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("hello from backend to frontend!");
});

app.use(express.json());

app.post("/weather", (req, res) => {
  const cityName = req.body.cityName;
  res.send(cityName);
});

app.listen(port, () => console.log(`Server started on port ${port}`));
