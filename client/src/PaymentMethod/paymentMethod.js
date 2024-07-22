import React from "react";
import './paymentMethod.css'
import { useState } from 'react';
import CreditCard from "./creditCard";
import PayNow from "./payNow";

function PaymentMethod(){
    const [selectedMethod, setSelectedMethod] = useState('');

    const handlePaymentChange = (event) => {
        setSelectedMethod(event.target.value);
    };

    return(
        <div className="PaymentMethodContainer">
             <div>
               <div className="radio-option">
                    <input type="radio" id="credit-card" name="payment-method" value="credit-card" onChange={handlePaymentChange}/>
                    <label htmlFor="credit-card">Credit/Debit Card</label>
                </div>
                <img className="Creditcard" src={process.env.PUBLIC_URL + "./images (3).png"} alt="Error displaying logo"></img> 
            </div>
            <div>
                <div className="radio-option">
                    <input type="radio" id="paynow-paylah" name="payment-method" value="paynow-paylah" onChange={handlePaymentChange} />
                    <label htmlFor="paynow-paylah">PayNow/PayLah</label>
                </div>
                <img className="Paynow" src={process.env.PUBLIC_URL + "./1042574.jpeg"} alt="Error displaying logo"></img> 
            </div>
            <div className="PaymentFormContainer">
                {selectedMethod === 'credit-card' && <CreditCard />}
                {selectedMethod === 'paynow-paylah' && <PayNow />}
            </div>
        </div>
    )
}
export default PaymentMethod;