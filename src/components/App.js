import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import ShowWeather from './weather/ShowWeather';
import ShowDay from './weather/ShowDay';
import Header from './Header';
import ZipcodeInput from './Zipcode_Input';
import { WeatherStore } from '../contexts/WeatherContext';

class App extends React.Component {

    render() {
        return (
            <div className="ui container" style={{marginTop: '10px'}}>
                <WeatherStore>
                    <Router history={history}>
                        <Header/>
                        <ZipcodeInput />
                        <Switch>
                            <Route path="/apps/weather_context/" exact render={() => <ShowWeather/>}/>
                            <Route path="/apps/weather_context/:day" render={() => <ShowDay/>}/>
                        </Switch>
                    </Router>
                </WeatherStore>
            </div>
        );
    }
}

export default App;