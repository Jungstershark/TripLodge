import React from "react";
import './creditCard.css';

function CreditCard(){
    return(
        <div className="CreditCardContainer">
            <div className="NewCard">New Card</div>
            <div className="CardHolder">
                Cardholder's Name*
                <input className="name" required></input>
            </div>
            <div className="CardNumber">
                Card Number*
                <input  className="number" required></input>
            </div>
            <div className="ExpiryDate">
                Expiry Date*
                <input className="date" placeholder="MM/YY"></input>
            </div>
            <div className="CardCVC">
                CVC*
                <input className="CVC"></input>
            </div>
        </div>
    );
};

export default CreditCard;