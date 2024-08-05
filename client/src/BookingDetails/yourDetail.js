import React from "react";
import DetailPayment from "../SharedContent/detailPayment";
import CustomerDetail from "./customerDetail";
import "./yourDetail.css";

function YourDetail({onConfirmBooking}){
    const handleSubmit = (event) => {
        console.log("Confirm Booking button clicked in YourDetail");
        if (onConfirmBooking) {
            onConfirmBooking(); // Call the passed function
        }
    };
    return(
        <>
        <div className="wholepage">
            <DetailPayment/>
            <CustomerDetail/>
            <img className="tick" src={process.env.PUBLIC_URL + "../tick-icon-transparent-free-png.webp"} alt="Error displaying logo"></img>
            <h1 className="two">2</h1>
            <h1 className="three">3</h1>
            <form onSubmit={handleSubmit}>
                <button className="DetailButton" type="submit">Confirm Booking</button>
            </form>

            {/* <form onSubmit={handleSubmit}>
          <button type="submit">Checkout</button>
        </form> */}
        </div>
        </>
    )
}

export default YourDetail;
