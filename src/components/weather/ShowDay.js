import './ShowDay.css';
import React from 'react';
import { Link } from 'react-router-dom';
import history from '../../history';
import { convertUTC } from '../helper_functions/helpers';

class showDay extends React.Component {

    //makes sure that if there is no data, it pushes to home so that there are no errors thrown.
    componentDidMount() {
        if(!this.props.dayWeather.dt) {
            history.push('/');
        }
    }

    //takes in the wind direction as an angle and spits out the wind direction.
    degToCompass(num) {
        const val = Math.floor((num / 22.5) + 0.5);
        const arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
        return arr[(val % 16)];
    }

    renderChosenDay() {
        console.log(this.props);
        if (this.props.dayWeather.dt) {
            const {city, state, zip, dayWeather} = this.props;
            const icon = "http://openweathermap.org/img/w/" + dayWeather.weather[0].icon + ".png";
            const day = convertUTC(`${dayWeather.dt}`, 'weekday', 'long');
            const sunrise = convertUTC(`${dayWeather.sunrise}`, 'time', 'short');
            const sunset = convertUTC(`${dayWeather.sunset}`, 'time', 'short');
            const windDirection = this.degToCompass(dayWeather.wind_deg);
            const windInformation = `${windDirection} ${Math.round(dayWeather.wind_speed)}mph`;
            console.log(windInformation);
            return (
                <section className="currentDate" key={dayWeather.dt}>
                    <div className="column50">
                        <div className="location">{`${city}, ${state} ${zip}`}</div>
                        <div className="day">{day}</div>
                        <div className="weatherDescription">{dayWeather.weather[0].description}</div>
                        <div><img className="weatherIcon" src={`${icon}`} alt="weather icon"/> <span
                            className="temperature">{`${Math.round(dayWeather.temp.day)}`}</span><span
                            className="degree">&deg;</span><span className="farenheit">{`F`}</span>
                        </div>
                        <div>
                            <span className="temperatureMax">{`Max Temperature: ${Math.round(dayWeather.temp.max)}`}</span><span
                            className="degreeSmall">&deg;</span><span className="farenheitSmall">{`F   `}</span>
                        </div>
                        <div>
                            <span className="temperatureMin">{`Min Temperature: ${Math.round(dayWeather.temp.min)}`}</span><span
                            className="degreeSmall">&deg;</span><span className="farenheitSmall">{`F`}</span>
                        </div>
                    </div>
                    <div className="column50">
                        <div>{`Clouds: ${Math.round(dayWeather.clouds)}%`}</div>
                        <div>{`Wind: ${windInformation}`}</div>
                        <div>{`Humidity: ${dayWeather.humidity}%`}</div>
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
                <Link to={`/`} className="button">Back To Current Weather</Link>
            </div>
        )
    }
};

export default showDay;