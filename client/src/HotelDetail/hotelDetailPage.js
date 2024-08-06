import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import PageHeader from "../pageHeader/pageHeader";
import SearchBar from "../searchBar/searchBar";
import RoomSearchBar from "./RoomSearchBar";
import Rating from '@mui/material/Rating';
import './hotelDetailPage.css';
import Amenities from './Amenities/Amenities';
import QuiltedImageList from './QuiltedImageList';
import { LinearProgress } from '@mui/material';
import HotelDetailCard from './hotelDetailCard/HotelDetailCard';

function HotelDetailPage() {
    const { id } = useParams();  
    const location = useLocation();
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showMore, setShowMore] = useState(false);
    const [filter, setFilter] = useState('All');
    const [guests, setGuests] = useState({ adults: 1, children: 0, rooms: 1 });
  const [dates, setDates] = useState({ checkin: '', checkout: '' });

  // Extract state from location
  const { state } = location;
  const checkinDate = state?.checkin || formatDate(new Date());
  const checkoutDate = state?.checkout || formatDate(new Date(new Date().getTime() + 24 * 60 * 60 * 1000));
  const guestsCount = state?.guests || { adults: 1, children: 0, rooms: 1 };

  useEffect(() => {
    setDates({ checkin: checkinDate, checkout: checkoutDate });
    setGuests(guestsCount);
  }, [checkinDate, checkoutDate, guestsCount]);

    // Format date function
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    useEffect(() => {
        const fetchHotel = async () => {
            const url = `${process.env.REACT_APP_SERVER_URL}/search/hotel/${id}`;
            const data = {
                destination_id: 'WD0M',
                checkin: checkinDate,
                checkout: checkoutDate,
                lang: 'en_US',
                guests: 2,
                currency: 'SGD'
            };

            try {
                console.log('Fetching hotel...');
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                const result = await response.json();
                setLoading(false);
                setHotel({ ...result.hotel, rooms: result.rooms });
            } catch (error) {
                console.error('Error fetching hotel:', error);
                setError('Failed to load hotel.');
                setLoading(false);
            }
        };
        fetchHotel();
    }, [id, checkinDate, checkoutDate]);

    if (loading) {
        return (
            <div className='loading-container'>
                <div className='loading-content'>
                    <LinearProgress sx={{ width: 200 }} />
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

    const filteredRooms = hotel?.rooms.filter(room => filter === 'All' || room.roomNormalizedDescription.includes(filter)) || [];

    return (
        <div className="HotelDetailPage">
            <PageHeader />
            <SearchBar />
            <div className='HotelImageContainer'>
                <QuiltedImageList itemData={hotel}/>
            </div>
            <div className='hotel-details-container'>
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
                    <Amenities amenities={hotel.amenities}/>
                    <div className="ChooseRoom">
                        <h1 className='ChooseYourRoom'>Choose Your Room</h1>
                        <div>
                            <button className={`FilterButton ${filter === 'All' ? 'active' : ''}`} onClick={() => setFilter('All')}>All</button>
                            <button className={`FilterButton ${filter === 'Executive Suite' ? 'active' : ''}`} onClick={() => setFilter('Executive Suite')}>Executive Suite</button>
                            <button className={`FilterButton ${filter === 'Deluxe' ? 'active' : ''}`} onClick={() => setFilter('Deluxe')}>Deluxe</button>
                            <button className={`FilterButton ${filter === 'Premier' ? 'active' : ''}`} onClick={() => setFilter('Premier')}>Premier</button>
                        </div>
                        <HotelDetailCard filteredRooms={filteredRooms} hotel={hotel} dates={{ checkin: checkinDate, checkout: checkoutDate }} guests={guests}/>
                    </div>
                </div>
            )}
            </div>
        </div>
    );
}

export default HotelDetailPage;
