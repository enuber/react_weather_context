import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import Geocode from 'react-geocode';
import openweatherOnecall from '../apis/openweatherOneCall';
import ShowWeather from './weather/ShowWeather';
import ShowDay from './weather/ShowDay';
import Header from './Header';
import ZipcodeInput from './Zipcode_Input';
import Keys from '../config.json';

class App extends React.Component {

    state = {
        currentWeather: {},
        dayClickedWeather: {},
        lat: null,
        lng: null,
        city: null,
        state: null,
        zip: null,
        error: false
    };

    //uses a call to google api to get lat and long from zipcode. Need these to properly make the call to weather api
    getLocation = async zipcode => {
        if (!this.state.error) {
            Geocode.setApiKey(Keys.keys[0].google);
            await Geocode.fromAddress(zipcode).then(
                response => {
                    const {lat, lng} = response.results[0].geometry.location;
                    const city = response.results[0].address_components[1].long_name;
                    const state = response.results[0].address_components[3].short_name;
                    this.setState({
                        lat: lat,
                        lng: lng,
                        city: city,
                        state: state,
                        zip: zipcode,
                        error: false
                    });
                },
                error => {
                    this.setState({error: true});
                }
            )
        }
    };

    //this happens after the getLocation finishes making it's call so we can use the lat and lng to get weather data
    getWeather = async () => {
        if (!this.state.error) {
            const response = await openweatherOnecall.get('', {
                params: {
                    lat: this.state.lat,
                    lon: this.state.lng,
                    exclude: "minutely",
                    units: "imperial",
                    appid: Keys.keys[0].openweather
                }
            });
            this.setState({currentWeather: response.data});
        }
    };

    onSearchSubmit = async (zipcode, error) => {
        history.push('/');
        await this.setState({error: error});
        await this.getLocation(zipcode);
        await this.getWeather(zipcode);
    };

    onDayClick = (dayClicked, day) => {
        this.setState({dayClickedWeather: dayClicked});
        history.push(`/${day}`);
    };

    render() {
        return (
            <div className="ui container" style={{marginTop: '10px'}}>
                <Router history={history}>
                    <Header/>
                    <ZipcodeInput onSubmit={this.onSearchSubmit}/>
                    <Switch>
                        <Route path="/" exact render={() =>
                            <ShowWeather
                                allWeather={this.state.currentWeather}
                                city={this.state.city}
                                state={this.state.state}
                                zip={this.state.zip}
                                error={this.state.error}
                                clickedADay={this.onDayClick}
                            />}
                        />
                        <Route path="/:day" render={() =>
                            <ShowDay
                                dayWeather={this.state.dayClickedWeather}
                                city={this.state.city}
                                state={this.state.state}
                                zip={this.state.zip}
                                error={this.state.error}
                                clickedADay={this.onDayClick}
                            />}
                        />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;