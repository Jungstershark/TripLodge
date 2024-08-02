import React from "react";
import PageHeader from "../pageHeader/pageHeader";
import './Success.css'

export default function Success() {
  return (
    <div>
      <PageHeader/>
      <div className="Success">
        <img className="greentick" src={process.env.PUBLIC_URL + "../images.png"} alt="Error displaying logo"></img>
        <h1 className="BookingSuccess">Booking Successfull</h1>
        <div className="BookingInformation">We have sent your booking information to your email adress</div>
      </div>
    </div>
  )
}
