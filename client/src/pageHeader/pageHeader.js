import React from 'react';
import { Link } from 'react-router-dom';
import './pageHeader.css';

function PageHeader() {
    return (
        <header>
        <ul>
            <li className="Logo">
                <img src={process.env.PUBLIC_URL + "/Ascenda_Blue_Logo.jpg"} alt="Error displaying logo" />
            </li>
            <li className="SignIn">
                <Link to="/login">Sign in</Link>
            </li>
            <li className="ContactUs">
                <a href="#contactus">Contact Us</a>
            </li>
            <li className="SGD"><button>SGD ▼</button></li>
        </ul>
        </header>
    );
}

export default PageHeader;
