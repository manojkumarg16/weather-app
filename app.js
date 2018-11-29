const express = require("express");
const app = express();
const request = require("request");
const path = require("path");
const port = 3002;

app.use(express.static(path.join(__dirname, "./build")));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); //My frontend APP domain
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/getWeather", async (req, res) => {
  let { city, appid } = req.query;
  let url = `https://samples.openweathermap.org/data/2.5/forecast?q=${city}&appid=${appid}`;
  console.log(city, appid, url, req.query)
  request.get(
    {
      url: url
    },
    function(error, response, body) {
      res.json(JSON.parse(response.body));
    }
  );
});
app.listen(process.env.PORT || port, () => {
  console.log(`Server listening on the port ${port}`);
});
