import './ShowHourly.css';
import React from 'react';
import { convertUTC } from '../helper_functions/helpers';

class showHourly extends React.Component {

    renderHourList() {
        const hourList = this.props.hourlyWeather.slice(0, 26);
        return hourList.map(currentTime => {
            const hour = convertUTC(`${currentTime.dt}`, 'hour', 'numeric');
            const icon = "http://openweathermap.org/img/w/"+ currentTime.weather[0].icon +".png";
            const temperature = Math.round(currentTime.temp);
            return (
                <div className="hourContainer" key={currentTime.dt}>
                    <h5>{hour}</h5>
                    <img className="weatherIconHourly" src={`${icon}`} alt="weather icon" />
                    <h5>{temperature}&deg;{`F`}</h5>
                </div>
            )
        });
    }

    render() {
        return(
            <div className="hourList">
                {this.renderHourList()}
            </div>
        )
    }

}

export default showHourly;