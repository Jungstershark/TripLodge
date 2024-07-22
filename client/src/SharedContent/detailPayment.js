import React from 'react';
import PageHeader from '../pageHeader.js';
import CurrentPage from './currentPage.js';
import HotelBooking from './hotelBooking.js';
import HotelDetails from './hotelDetails.js';
import PriceCalculation from './priceCalculation.js';
import './detailPayment.css';

function DetailPayment(){
    return(
        <>
        <PageHeader/>
        <CurrentPage/>
        <HotelBooking className='HotelBooking'/>
        <HotelDetails className='HotelDetails'/>
        <PriceCalculation className='PriceCalculation'/> 
        </>
    )
}
export default DetailPayment;