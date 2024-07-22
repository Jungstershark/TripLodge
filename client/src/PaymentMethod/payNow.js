import React from "react";
import './payNow.css';

function PayNow(){
    return(
        <div className="QRCodeContainer">
            <h1>Scan The QR Code Below to complete Payment </h1>
            <div className="QRcode">
                Image of QR code generated
            </div>
        </div>
    );
};

export default PayNow;