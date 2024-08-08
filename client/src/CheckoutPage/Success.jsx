import React from "react";
import PageHeader from "../pageHeader/pageHeader";
import './Success.css'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function Success() {
  return (
    <div className="container">
      <PageHeader/>
      <div className="Success">
        <CheckCircleIcon fontSize="large" sx={{ color: "#50C878" }}/>
        <h1 className="BookingSuccess">Booking Successfull</h1>
        <div className="BookingInformation">We have sent your booking information to your email adress</div>
      </div>
    </div>
  )
}
