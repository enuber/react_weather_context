import React from 'react';

class Zipcode_Input extends React.Component {

    state = {
        zipcode: ''
    };

    //
    onFormSubmit = e => {
        e.preventDefault();
        const currentZip = this.state.zipcode;
        if ((currentZip.length === 5) && (this.isInt(currentZip))) {
            this.props.onSubmit(currentZip, false);
            this.setState({zipcode: ''})
        } else {
            this.props.onSubmit(currentZip, true);
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