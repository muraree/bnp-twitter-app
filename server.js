const express = require('express');
var Twitter = require('twitter');
var bodyParser = require('body-parser')

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: '10mb' }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

const server = app.listen(port);
const io = require("socket.io").listen(server);

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

io.on("connection", socket => {
  console.log("New client connected");
  setInterval(() => subscribeAndEmit(socket), 10000);
  socket.on("disconnect", () => console.log("Client disconnected"));
});

const subscribeAndEmit = async socket => {
  try {
    const {lat, long, prevFirstTweet } = socket.request._query;
    const geocode = `${lat},${long},100mi`;
    const params = {q: 'nowplaying', count: 5, geocode: geocode };
    const tweets = await client.get('search/tweets', params);
    if (tweets[0] && prevFirstTweet !== tweets.statuses[0].id_str) {
      socket.emit("getRecentTweets", { tweets: tweets });
    }
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

app.get('/api/tweets', async (req, res) => {
  try {
    const { lat, long, maxId: max_id } = req.query;
    const geocode = `${lat},${long},100mi`;
    var params = {q: 'nowplaying', count: 5, geocode: geocode, max_id: max_id };
    const tweets = await client.get('search/tweets', params)
    if (max_id) tweets.statuses.splice(0, 1);
    res.send({ tweets: tweets });
  } catch(err) {
    console.log(err);
  }
});

app.post('/api/tweet', (req, res) => {
  const url = req.body.url || '';
  const params = {
    status: req.body.comment + " #nowplaying " + url,
    lat: req.body.lat,
    long: req.body.lon,
    display_coordinates: true
  };

  client.post('statuses/update', params, (error, tweet, response) => {
    if(error) throw error;
    res.send({ tweet: tweet });
  });
});
