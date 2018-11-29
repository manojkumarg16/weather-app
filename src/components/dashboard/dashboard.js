import React, { Component } from "react";
import request from "request";
import moment from "moment";
import "./dashboard.css";
const { REACT_APP_API_KEY } = process.env;

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      city: "london",
      weather: []
    };
  }
  getWeather = city => {
    this.setState({ isLoading: true });
    request.get(
      {
        url: `http://localhost:3002/getWeather?city=${city}&appid=${REACT_APP_API_KEY}`
      },
      (error, response, body) => {
        console.log(JSON.parse(body));
        this.setState({ isLoading: false, weather: JSON.parse(body).list });
      }
    );
  };
  showWeatherCard = (detail, index) => {
    return (
      <div className="card" key={index}>
        <img
          className="card-img-top"
          src={`http://openweathermap.org/img/w/${detail.weather[0].icon}.png`}
          alt="Weather status"
        />
        <div className="card-body">
          <h5 className="card-title">
            {moment(detail.dt_txt, "YYYY-MM-DD hh:mm:ss").format("MMM Do YYYY")}
          </h5>
          <p className="card-text">{detail.weather[0].description}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <b>Pressure:</b> {detail.main.pressure}
          </li>
          <li className="list-group-item">
            <b>Temprature:</b> {detail.main.temp}
          </li>
          <li className="list-group-item">
            <b>Humidity:</b> {detail.main.humidity}
          </li>
        </ul>
      </div>
    );
  };
  onChange = e => {
    this.setState({ city: e.target.value });
  };
  render() {
    const { weather, city, isLoading } = this.state;
    return (
      <div>
        <div className="content">
          <h3>Weather Forecast</h3>
          <div className="section" id="section">
            <div className="row" id="row">
              <input
                type="text"
                name="city"
                className="class"
                placeholder="Search here.."
                id="word"
                onChange={this.onChange}
              />
              <button
                className="btn btn-primary btn-lg"
                onClick={() => this.getWeather(city)}
              >
                Search
              </button>
            </div>
          </div>
          {!isLoading ? (
            weather.length ? (
              weather.map((data, index) => {
                return this.showWeatherCard(data, index);
              })
            ) : (
              <h1>No weather</h1>
            )
          ) : (
            <h1>Loading</h1>
          )}
        </div>
      </div>
    );
  }
}
