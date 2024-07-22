import React from 'react';
import './currentPage.css';
import { Circle } from 'react-awesome-shapes/dist/shapes/circle';

function CurrentPage() {
    return(
        <currentlist>
            <div className='line1'></div>
            <div className='line2'></div>
            <ul className='currentList'>
                <li className='BookingDetail'>
                    <Circle position ='relative' top ='-2px' left= '10px' color="#D9D9D9" size={['41px', '41px', '41px', '41px']} />
                    Booking Details
                </li>
                
                <li className='YourDetail'>
                    <Circle position ='relative' top='-2px' left='5px' color="#D9D9D9" size={['41px', '41px', '41px', '41px']} />
                    Your Details
                </li>
                
                <li className='PaymentDetail'>
                    <Circle position ='relative' top='-2px' left='10px' color="#D9D9D9" size={['41px', '41px', '41px', '41px']} />
                    Payment Details
                </li>
            </ul>
        </currentlist>

    );
}
export default CurrentPage;
