import React from "react";
import PageHeader from "../pageHeader/pageHeader";
import CurrentPage from "../SharedContent/currentPage";
import CustomerDetail from "./customerDetail";
import { useLocation } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import "./yourDetail.css";

function YourDetail({onConfirmBooking}){
    const handleSubmit = (event) => {
        console.log("Confirm Booking button clicked in YourDetail");
        if (onConfirmBooking) {
            onConfirmBooking(); // Call the passed function
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const getRatingText = (rating) => {
        const ratingOutOf10 = rating * 2;
        if (ratingOutOf10 >= 9) return 'Excellent';
        if (ratingOutOf10 >= 7) return 'Highly Recommended';
        if (ratingOutOf10 >= 5) return 'Recommended';
        return 'Not Recommended';
    };

    const location = useLocation();
    const { hotel, room, dates, guests} = location.state || {}; // Destructure the state object

    if (!hotel || !room || !dates) {
        return <div className="Error">Error: Missing booking details.</div>;
    }

  
    const pricecalculation =(price) =>{
        return price * (100/109);
    }
    const tax =(price)=>{
        return price - pricecalculation(price);
    }

    console.log('This is the details:',location.state)

    return(
        <>
        <div className="wholepage">
            <PageHeader/>
            <CurrentPage/>
            <div className="HotelDetailContainer">
                <h3 className="HotelName">{hotel.name}</h3>
                <div className="location">{hotel.address}</div>
                <div className="rating">
                    <Rating className="read-only" value={hotel.rating} readOnly />
                </div>
                <div className="numberrating">{hotel.rating * 2}</div>
                <div className="wordrating">{getRatingText(hotel.rating)}</div>
            </div>
            <div className="BookingDetailContainer">
                <h3 className="BookingDetail">Booking Detail</h3>
                <div className="CheckIn">
                    <div>Check-In</div>
                    <div className="CheckInDate">
                        <h3>{formatDate(dates.startDate)}</h3>
                    </div>
                    <div>From 08:00</div>
                </div>
                <div className="divider">|</div>
                <div className="CheckOut">
                    <div>Check-Out</div>
                    <div className="CheckOutDate">
                        <h3>{formatDate(dates.endDate)}</h3>
                    </div>
                    <div>Until 12:00</div>
                </div>
                <div className="NumberOfGuest">
                    <h3>{guests.rooms} room for {guests.adults} adults {guests.children > 0 && ` and ${guests.children} children`}</h3>
                </div>
                <div className="HotelRoom">{room.roomDescription}</div>
            </div>
            <div className="PriceCalculationContainer">
                <h3>Your Price Summary</h3>
                <div>
                    <div className="OriginalPrice">
                        <div>Original Price</div>
                        <div className="OGprice">S$ {pricecalculation(room.price).toFixed(2)}</div>
                    </div>
                    <div className="PercentTax">
                        <div>9% Taxes </div>
                        <div className="Taxprice">S$ {tax(room.price).toFixed(2)}</div>
                    </div>
                    <div className="TotalSum">
                        <div>Total Sum: </div>
                        <div className="Totalprice">S$ {room.price.toFixed(2)}</div>
                    </div>
                </div>
                
            </div>
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
