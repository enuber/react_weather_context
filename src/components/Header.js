import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="ui secondary pointing menu">
            <Link to="/apps/weather_context/" className="item">
                Get Weather - React with Context
            </Link>
            <div className="right menu">
                <Link to="/apps/weather_context/" className="item">Home</Link>
            </div>
        </div>
    )
};

export default Header;