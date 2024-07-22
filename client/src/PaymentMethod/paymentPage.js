import React from "react";
import DetailPayment from "../SharedContent/detailPayment";
import PaymentMethod from "./paymentMethod";
import './paymentPage.css'

function PaymentPage(){
    return(
        <>
        <DetailPayment/>
        <div className="Payment Container">
            <PaymentMethod/>
        </div>
        <button className="CompleteBooking">Complete Booking</button>
        <img className="tick2" src={process.env.PUBLIC_URL + "./tick-icon-transparent-free-png.webp"} alt="Error displaying logo"></img>
        <img className="tick3" src={process.env.PUBLIC_URL + "./tick-icon-transparent-free-png.webp"} alt="Error displaying logo"></img>
        <h1 className="three">3</h1>
        </>
    )
}

export default PaymentPage;

