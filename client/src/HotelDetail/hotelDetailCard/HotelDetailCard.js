import React from 'react';
import Amenities from '../Amenities/Amenities';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import './HotelDetailCard.css'; // Ensure you have your CSS file

function HotelDetailCard({ filteredRooms, hotel, dates, guests }) {
    const navigate = useNavigate();

    const handleReserveClick = (room) => {
        const dataToPass = { hotel, room, dates, guests };
        console.log("hehe",dataToPass);
        navigate('/checkout', { state: dataToPass });
    };

    const settings = {
        dots: false, // Disable dots
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true, // Enable arrows
        prevArrow: <button className="slick-arrow slick-prev"><KeyboardArrowLeftIcon /></button>,
        nextArrow: <button className="slick-arrow slick-next"><KeyboardArrowRightIcon /></button>
    };

    return (
        <div>
            {filteredRooms.map((room, index) => (
                <div key={index} className={`Room${index + 1}`}>
                    <Slider {...settings}>
                        {room.images.map((image, imgIndex) => (
                            <img key={imgIndex} className="Onsuite" src={image.url} alt={`Room ${index} Image ${imgIndex}`} />
                        ))}
                    </Slider>
                    <div className="RoomDetail">{room.roomDescription}</div>
                    <Amenities amenities={room.amenities} HotelDetailCard={true} />
                    <div className="Price">Price of Room: {room.price}</div>
                    <div className="NoOfRoom">1 room</div>
                    <div className='tax'>includes taxes & fees</div>
                    <button className="Reserve" onClick={() => handleReserveClick(room)}>Reserve</button>
                </div>
            ))}
        </div>
    );
}

export default HotelDetailCard;
