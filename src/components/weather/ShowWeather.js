import './ShowWeather.css';
import React from 'react';
import ShowHourly from './ShowHourly';
import ShowDailyList from './ShowDailyList';
import { convertUTC } from '../helper_functions/helpers';

class showWeather extends React.Component {

    renderCurrent() {
        const {city, state, zip} = this.props;
        const {current} = this.props.allWeather;
        const icon = "http://openweathermap.org/img/w/"+ current.weather[0].icon +".png";
        const day = convertUTC(`${current.dt}`, 'weekday', 'long');
        const sunrise = convertUTC(`${current.sunrise}`, 'time', 'short');
        const sunset = convertUTC(`${current.sunset}`, 'time', 'short');
        return (
            <section className="currentDate" key={current.dt}>
                <div className="column50">
                    <div className="location">{`${city}, ${state} ${zip}`}</div>
                    <div className="day">{day}</div>
                    <div className="weatherDescription">{current.weather[0].description}</div>
                    <div><img className="weatherIcon" src={`${icon}`} alt="weather icon" /> <span className="temperature">{`${Math.round(current.temp)}`}</span><span className="degree">&deg;</span><span className="farenheit">{`F`}</span></div>
                </div>
                <div className="column50">
                    <div className="sunTime">{`Sunrise: ${sunrise}`}</div>
                    <div className="sunTime">{`Sunset: ${sunset}`}</div>
                </div>
            </section>
        )
    }

    render() {
        if (this.props.error) {
            return (
                <div className="section">
                    <h2>Forecast</h2>
                    <div className="error centerDiv">There is a problem with the ZIP code entered, please try again</div>
                </div>
            )
        } else if (!this.props.allWeather.current) {
            return (
                <div className="section">
                    <h2>Forecast</h2>
                    <div className="centerDiv">Waiting for ZIP code</div>
                </div>
            )
        }
        return(
            <div className="section">
                <h2>Forecast</h2>
                <div className="mainCard">
                    {this.renderCurrent()}
                    <ShowHourly
                        hourlyWeather={this.props.allWeather.hourly}
                    />
                    <ShowDailyList
                        dailyWeather={this.props.allWeather.daily}
                        clickedADay={this.props.clickedADay}
                    />
                </div>
            </div>
        )
    }
}

export default showWeather;