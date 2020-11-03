import React from 'react';
import WeatherContext from '../contexts/WeatherContext';

class Zipcode_Input extends React.Component {
    static contextType = WeatherContext;

    state = {
        zipcode: ''
    };

    //
    onFormSubmit = e => {
        e.preventDefault();
        const currentZip = this.state.zipcode;
        if ((currentZip.length === 5) && (this.isInt(currentZip))) {
            this.context.onSearchSubmit(currentZip, false);
            this.setState({zipcode: ''})
        } else {
            this.context.onSearchSubmit(currentZip, true);
        }
    };

    //extra protection to make sure number is an integer
    isInt = currentZip => {
        return (parseFloat(currentZip) === parseInt(currentZip) && !isNaN(currentZip))
    };


    render() {
        return (
            <div className="ui segement">
                <form className="ui form" onSubmit={this.onFormSubmit}>
                    <div className="field">
                        <label>Enter ZIP Code</label>
                        <input
                            type="text"
                            pattern="[0-9]*"
                            maxLength="5"
                            value={this.state.zipcode}
                            onChange={(e)=>this.setState({ zipcode: e.target.value })}
                        />
                    </div>
                </form>
            </div>
        );
    }
}

export default Zipcode_Input;