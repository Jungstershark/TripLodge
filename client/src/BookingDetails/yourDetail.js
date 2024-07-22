import React from "react";
import DetailPayment from "../SharedContent/detailPayment";
import CustomerDetail from "./customerDetail";
import "./yourDetail.css";

function YourDetail(){
    return(
        <>
        <div className="wholepage">
        <DetailPayment/>
        <CustomerDetail/>
        <img className="tick" src={process.env.PUBLIC_URL + "../tick-icon-transparent-free-png.webp"} alt="Error displaying logo"></img>
        <h1 className="two">2</h1>
        <h1 className="three">3</h1>
        <button className="DetailButton">Confirm Booking</button>
        </div>
        </>
    )
}

export default YourDetail;