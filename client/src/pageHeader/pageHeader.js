import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import UserSelect from './UserSelect';
import './pageHeader.css';

function PageHeader() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogoClick = () => {
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
                <li className="UserOptions">
                    {user ? (
                        <UserSelect /> // Display the dropdown if user is logged in
                    ) : (
                        <Link to="/login">Sign in</Link>
                    )}
                </li>
                <li className="ContactUs">
                    <a href="#contactus">Contact Us</a>
                </li>
            </ul>
        </header>
    );
}

export default PageHeader;
