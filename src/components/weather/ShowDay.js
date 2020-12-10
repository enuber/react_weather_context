import './ShowDay.css';
import React from 'react';
import { Link } from 'react-router-dom';
import history from '../../history';
import { convertUTC } from '../helper_functions/helpers';
import WeatherContext from '../../contexts/WeatherContext';

class showDay extends React.Component {
    static contextType = WeatherContext;

    //makes sure that if there is no data, it pushes to home so that there are no errors thrown.
    componentDidMount() {
        if(!this.context.dayClickedWeather.dt) {
            history.push('/apps/weather_context/');
        }
    }

    //takes in the wind direction as an angle and spits out the wind direction.
    degToCompass(num) {
        const val = Math.floor((num / 22.5) + 0.5);
        const arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
        return arr[(val % 16)];
    }

    renderChosenDay() {
        if (this.context.dayClickedWeather.dt) {
            const {city, state, zip, dayClickedWeather} = this.context;
            const icon = "http://openweathermap.org/img/w/" + dayClickedWeather.weather[0].icon + ".png";
            const day = convertUTC(`${dayClickedWeather.dt}`, 'weekday', 'long');
            const sunrise = convertUTC(`${dayClickedWeather.sunrise}`, 'time', 'short');
            const sunset = convertUTC(`${dayClickedWeather.sunset}`, 'time', 'short');
            const windDirection = this.degToCompass(dayClickedWeather.wind_deg);
            const windInformation = `${windDirection} ${Math.round(dayClickedWeather.wind_speed)}mph`;
            return (
                <section className="currentDate" key={dayClickedWeather.dt}>
                    <div className="column50">
                        <div className="location">{`${city}, ${state} ${zip}`}</div>
                        <div className="day">{day}</div>
                        <div className="weatherDescription">{dayClickedWeather.weather[0].description}</div>
                        <div><img className="weatherIcon" src={`${icon}`} alt="weather icon"/> <span
                            className="temperature">{`${Math.round(dayClickedWeather.temp.day)}`}</span><span
                            className="degree">&deg;</span><span className="farenheit">{`F`}</span>
                        </div>
                        <div>
                            <span className="temperatureMax">{`Max Temperature: ${Math.round(dayClickedWeather.temp.max)}`}</span><span
                            className="degreeSmall">&deg;</span><span className="farenheitSmall">{`F   `}</span>
                        </div>
                        <div>
                            <span className="temperatureMin">{`Min Temperature: ${Math.round(dayClickedWeather.temp.min)}`}</span><span
                            className="degreeSmall">&deg;</span><span className="farenheitSmall">{`F`}</span>
                        </div>
                    </div>
                    <div className="column50">
                        <div>{`Clouds: ${Math.round(dayClickedWeather.clouds)}%`}</div>
                        <div>{`Wind: ${windInformation}`}</div>
                        <div>{`Humidity: ${dayClickedWeather.humidity}%`}</div>
                        <div>{`Sunrise: ${sunrise}`}</div>
                        <div>{`Sunset: ${sunset}`}</div>
                    </div>
                </section>
            )
        }
    }

    render() {
        return(
            <div className="section">
                <h2>Forecast</h2>
                <div className="dayContainer">
                    {this.renderChosenDay()}
                </div>
                <Link to={`/apps/weather_context/`} className="button">Back To Current Weather</Link>
            </div>
        )
    }
};

export default showDay;