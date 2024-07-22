import React from "react";
import './customerDetail.css';

function CustomerDetail(){
    return(
        <div className="container3">
            <h1>Enter Your Details</h1>
            <div className="FirstNameContainer">
                <div className="text">First Name*</div>
                <input className='Name'></input>
            </div>
            <div className="LastNameContainer">
                <div className="text">Last Name*</div>
                <input className='Name'></input>
            </div>
            <div className="EmailContainer">
                <div className="text">Email Adress*</div>
                <input className='other'></input>
                <div>Confirmation goes to this adress</div>
            </div>
            <div className="CountryContainer">
                <div className="text">Country/Region*</div>
                <input className="other"></input>
            </div>
            <div className="TelephoneContainer">
                <div className="text">Telephone (mobile number preferred)* </div>
                <input className="other"></input>
            </div>

        </div>
    )
}
export default CustomerDetail;