import React from "react";
import './customerDetail.css';

function CustomerDetail({ onCustomerDetailChange }) {
    const handleChange = (e) => {
        onCustomerDetailChange(e.target.name, e.target.value);
    };

    return (
        <div className="container3">
            <h1>Enter Your Details</h1>
            <div className="FirstNameContainer">
                <div className="text">First Name*</div>
                <input
                    name="firstName"
                    className='Name'
                    onChange={handleChange}
                    data-testid="firstName"
                />
            </div>
            <div className="LastNameContainer">
                <div className="text">Last Name*</div>
                <input
                    name="lastName"
                    className='Name'
                    onChange={handleChange}
                    data-testid="lastName"
                />
            </div>
            <div className="CountryContainer">
                <div className="text">Country/Region*</div>
                <input
                    name="country"
                    className="other"
                    onChange={handleChange}
                    data-testid="country"
                />
            </div>
            <div className="TelephoneContainer">
                <div className="text">Telephone (mobile number preferred)*</div>
                <input
                    name="telephone"
                    className="other"
                    onChange={handleChange}
                    data-testid="telephone"
                />
            </div>
        </div>
    );
}

export default CustomerDetail;
