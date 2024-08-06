import React, { useEffect, useState } from 'react';
import PageHeader from "../pageHeader/pageHeader";
import SearchBar from "../searchBar/searchBar";
import RoomSearchBar from "./RoomSearchBar";
import { useNavigate, useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import axios from 'axios';
import './hotelDetailPage.css';

function HotelDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const handleReserveClick = () => {
        navigate('/checkout');
    };

    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showMore, setShowMore] = useState(false);
    const [filter, setFilter] = useState('All'); // State for room filter

    useEffect(() => {
        const fetchHotel = async () => {
            const url = `${process.env.REACT_APP_SERVER_URL}/search/hotel/${id}`;
            const data = {
                destination_id: 'WD0M',
                checkin: '2024-10-01',
                checkout: '2024-10-07',
                lang: 'en_US',
                guests: 2,
                currency: 'SGD'
            };

            try {
                console.log('Fetching hotel...');
                const response = await axios.post(url, data);
                setLoading(false);
                console.log('Response data:', response.data.hotel);
                console.log('Response data:', response.data.rooms);
                setHotel({ ...response.data.hotel, rooms: response.data.rooms });
            } catch (error) {
                console.error('Error fetching hotel:', error);
                setError('Failed to load hotel.');
                setLoading(false);
            }
        };

        fetchHotel();
    }, [id]);

    if (loading) {
        return (
            <div className='loading-container'>
                <div className='loading-content'>
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    if (error) return <div className='Error'>{error}</div>;

    const getRatingText = (rating) => {
        const ratingOutOf10 = rating * 2;
        if (ratingOutOf10 >= 9) return 'Excellent';
        if (ratingOutOf10 >= 7) return 'Highly Recommended';
        if (ratingOutOf10 >= 5) return 'Recommended';
        return 'Not Recommended';
    };

    const extractPropertyLocation = (html) => {
        const div = document.createElement('div');
        div.innerHTML = html;
        const propertyLocationElement = div.querySelector('p');
        return propertyLocationElement ? propertyLocationElement.outerHTML : '';
    };

    const extractAdditionalContent = (html) => {
        const div = document.createElement('div');
        div.innerHTML = html;
        const paragraphs = div.querySelectorAll('p');
        return Array.from(paragraphs).slice(1).map(p => p.outerHTML).join('');
    };

    const filteredRooms = hotel?.rooms.filter(room => filter === 'All' || room.roomNormalizedDescription.includes(filter)) || [];

    return (
        <div className="HotelDetailPage">
            <PageHeader />
            <div className="HotelDetailSearchBar">
                <SearchBar />
            </div>
            <div className="HotelPictures">
                <img className="Hotel1Detail" src={`${process.env.PUBLIC_URL}/Hotel1.jpg`} alt="Hotel" />
                <img className="Pool" src={`${process.env.PUBLIC_URL}/Pool.jpg`} alt="Pool" />
                <img className="Bedroom" src={`${process.env.PUBLIC_URL}/Bedroom.jpg`} alt="Bedroom" />
                <img className="Dinning" src={`${process.env.PUBLIC_URL}/dinning.jpg`} alt="Dinning" />
                <img className="Lobby" src={`${process.env.PUBLIC_URL}/lobby.jpg`} alt="Lobby" />
            </div>
            <div className="MapnLocation">
                <div className="ExploreArea">Explore The Area</div>
                <div className="MapContainer">
                    <img className="Map" src={`${process.env.PUBLIC_URL}/hotelmap.png`} alt="Map" />
                    <div className="Location">{hotel.address}</div>
                </div>
            </div>
            {hotel && (
                <div className="HotelDetails">
                    <h1 className="HotelName">{hotel.name}</h1>
                    <div
                        className="HotelDescription"
                        dangerouslySetInnerHTML={{ __html: showMore ? hotel.description : extractPropertyLocation(hotel.description) }}
                    />
                    {!showMore && (
                        <button className="ShowMoreLessButton" onClick={() => setShowMore(true)}>Show More...</button>
                    )}
                    {showMore && (
                        <>
                            <button className="ShowMoreLessButton" onClick={() => setShowMore(false)}>Show Less...</button>
                        </>
                    )}
                    <Rating className="read-only" value={hotel.rating} readOnly />
                    <div>
                        <div className="numberrating">{hotel.rating * 2}</div>
                        <div className="wordrating">{getRatingText(hotel.rating)}</div>
                    </div>
                    <div className="reviews">See all reviews &gt;</div>
                    <div className="Amenities">
                        <h3>Popular Amenities</h3>
                        <div className="BarContainer">
                            <img className="Bar" src={`${process.env.PUBLIC_URL}/bar.png`} alt="Bar" />
                            Bar
                        </div>
                        <div className="SwimmingContainer">
                            <img className="Swimming" src={`${process.env.PUBLIC_URL}/swimming.png`} alt="Swimming" />
                            Pool
                        </div>
                        <div className="AirConContainer">
                            <img className="AirCon" src={`${process.env.PUBLIC_URL}/air-conditioner.png`} alt="Air Conditioning" />
                            Air Conditioning
                        </div>
                        <div className="GymContainer">
                            <img className="Gym" src={`${process.env.PUBLIC_URL}/gym.png`} alt="Gym" />
                            Gym
                        </div>
                        <div className="BreakfastContainer">
                            <img className="Breakfast" src={`${process.env.PUBLIC_URL}/coffee.png`} alt="Breakfast Available" />
                            Breakfast Available
                        </div>
                        <div className="FrontDeskContainer">
                            <img className="FrontDesk" src={`${process.env.PUBLIC_URL}/frontdesk.png`} alt="Front Desk" />
                            24/7 Front Desk
                        </div>
                    </div>
                    <div className="ChooseRoom">
                        <h1 className='ChooseYourRoom'>Choose Your Room</h1>
                        <RoomSearchBar />
                        <div>
                            <button className={`FilterButton ${filter === 'All' ? 'active' : ''}`} onClick={() => setFilter('All')}>All</button>
                            <button className={`FilterButton ${filter === 'Executive Suite' ? 'active' : ''}`} onClick={() => setFilter('Executive Suite')}>Executive Suite</button>
                            <button className={`FilterButton ${filter === 'Deluxe' ? 'active' : ''}`} onClick={() => setFilter('Deluxe')}>Deluxe</button>
                            <button className={`FilterButton ${filter === 'Premier' ? 'active' : ''}`} onClick={() => setFilter('Premier')}>Premier</button>
                        </div>
                        {filteredRooms.map((room, index) => (
                            <div key={index} className={`Room${index + 1}`}>
                                <img className="Onsuite" src={`${process.env.PUBLIC_URL}/bedroom1.jpg`} alt={room.roomDescription} />
                                <div className="RoomDetail">{room.roomDescription}</div>
                                <div className="wificontainer">
                                    <img className="wifi" src={`${process.env.PUBLIC_URL}/wifi.png`} alt="Free Wifi" />
                                    Free Wifi
                                </div>
                                <div className="citycontainer">
                                    <img className="cityview" src={`${process.env.PUBLIC_URL}/city.png`} alt="City View" />
                                    City View
                                </div>
                                <div className="squareftcontainer">
                                    <img className="squareft" src={`${process.env.PUBLIC_URL}/squareft.png`} alt="Square Ft" />
                                    {room.size} sq m
                                </div>
                                <div className="bedcontainer">
                                    <img className="bed" src={`${process.env.PUBLIC_URL}/bed.png`} alt="Bed" />
                                    {room.bed}
                                </div>
                                <div className="Price">{room.price}</div>
                                <button className="Reserve" onClick={handleReserveClick}>Reserve</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default HotelDetailPage;
