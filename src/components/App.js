import React, { Component } from 'react';
import './App.css';
import MainComponent from './MainComponent';
import axios from 'axios';
import socketIOClient from "socket.io-client";

class App extends Component {
  state = {
    tweets: [],
    url: null,
    comment: null,
    geolocation: {},
  };

  requestTweetsWithGeoLocation = async ({ coords }) => {
    this.setState(prevProps =>
      ({ ...prevProps,
        geolocation: { lat: coords.latitude, long: coords.longitude },
      }));
    await this.requestTweets();
    const { geolocation, tweets } = this.state;
    const prevFirstTweet = tweets[0] ? tweets[0].id_str : '';
    const socket = socketIOClient(`http://localhost:5000?lat=${geolocation.lat}&long=${geolocation.long}&prevFirstTweet=${prevFirstTweet}`);
    socket.on("getRecentTweets", res => this.setState(prevProps => ({ ...prevProps, tweets: res.tweets.statuses })));
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.requestTweetsWithGeoLocation);
  }

  handleChange = (key, value) => {
    this.setState({ ...this.state, [key]: value });
  }

  requestTweets = async () => {
    const { geolocation } = this.state;
    const res = await axios.get(`http://localhost:5000/api/tweets?lat=${geolocation.lat}&long=${geolocation.long}`)
    this.setState(prevProps => ({...prevProps, tweets: res.data.tweets.statuses}));
  }

  requestAndMergeTweets = async () => {
    const { geolocation, tweets } = this.state;
    if (!tweets[0]) return;
    const moreTweets = await axios.get(`http://localhost:5000/api/tweets?lat=${geolocation.lat}&long=${geolocation.long}&maxId=${tweets[tweets.length - 1].id_str}`);
    this.setState(prevProps => ({...prevProps, tweets: [...prevProps.tweets, ...moreTweets.data.tweets.statuses]}));
  }

  createNewTweet = async (event) => {
    event.preventDefault();
    const { url, comment, geolocation } = this.state;
    await axios.post('http://localhost:5000/api/tweet',
    {
      url, comment,
      lat: geolocation.latitude,
      long: geolocation.longitude,
    }, { headers: { 'Content-Type': 'application/json' }});
    this.getTweets();
  }

  render() {
    return (
      <MainComponent {...this.state}
        requestAndMergeTweets={this.requestAndMergeTweets}
        createNewTweet={this.createNewTweet}
        handleChange={this.handleChange}
      />
    );
  }
}

export default App;
