import React from 'react';
import history from '../history';
import Geocode from 'react-geocode';
import openweatherOnecall from '../apis/openweatherOneCall';
import Keys from '../config.json';

//this creates the context object. Here 'english' is the default value. We are rendering out a component so we need
//it to have a capital letter. Otherwise it will look like a div, form etc
const Context = React.createContext({
    currentWeather: {},
    dayClickedWeather: {},
    lat: null,
    lng: null,
    city: null,
    state: null,
    zip: null,
    error: false
});

//to access this we would use { LanguageStore } because it's a named export
export class WeatherStore extends React.Component {
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

    //here we are sharing the state and method to change the state with other components in the application
//we use children because everything that this component surrounds will then have access to the information inside
//this component. Meaning access to state and the method to change the state.
    render() {
        return(
            <Context.Provider value={{
                ...this.state,
                onSearchSubmit: this.onSearchSubmit,
                onDayClick: this.onDayClick
            }}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

//this would still be accessed import Context from '...';
export default Context;