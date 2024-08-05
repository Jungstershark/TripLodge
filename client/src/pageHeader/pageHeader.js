import React from 'react';
import {useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom';
import './pageHeader.css';

function PageHeader() {
    const navigate = useNavigate();

    const handleLogoClick = () =>{
        navigate("/");
    }
    return (
        <header>
        <ul>
            <li className="Logo">
                <button onClick={handleLogoClick} className="logobutton">
                <img src={process.env.PUBLIC_URL + "/Ascenda_Blue_Logo.jpg"} alt="Error displaying logo" />
                </button>
            </li>
            <li className="SignIn">
                <Link to="/login">Sign in</Link>
            </li>
            <li className="ContactUs">
                <a href="#contactus">Contact Us</a>
            </li>
        </ul>
        </header>
    );
}

export default PageHeader;
