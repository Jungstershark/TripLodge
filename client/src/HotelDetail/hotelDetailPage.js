// import React from "react";
// import PageHeader from "../pageHeader/pageHeader";
// import SearchBar from "../searchBar/searchBar";
// import RoomSearchBar from "./RoomSearchBar";
// import { useNavigate } from 'react-router-dom';
// import './hotelDetailPage.css'


// function HotelDetailPage(){

//     const navigate= useNavigate();
//     const handleReserveClick = () =>{
//         navigate('/checkout');
//     };

//     return(
//         <div className="HotelDetailPage">
//             <PageHeader/>
//             <div className="HotelDetailSearchBar">
//                 <SearchBar/>
//             </div>
//             <div className="HotelPictures">
//                 <img className="Hotel1Detail" src={`${process.env.PUBLIC_URL}/Hotel1.jpg`} alt="Error Displaying Img" />
//                 <img className="Pool"src={`${process.env.PUBLIC_URL}/Pool.jpg`} alt="Error displaying logo"></img>
//                 <img className="Bedroom" src={`${process.env.PUBLIC_URL}/Bedroom.jpg`} alt="Error displaying logo"></img>
//                 {/* <img className="Twinbed" src={process.env.PUBLIC_URL + "./twinbed.jpeg"} alt="Error displaying logo"></img> */}
//                 <img className="Dinning" src={`${process.env.PUBLIC_URL}/dinning.jpg`} alt="Error displaying logo"></img>
//                 <img className="Lobby" src={`${process.env.PUBLIC_URL}/lobby.jpg`} alt="Error displaying logo"></img>
//             </div>
//             <div className="MapnLocation">
//                 <div className="ExploreArea">Explore The Area</div>
//                 <div className="MapContainer">
//                     <img className="Map" src={`${process.env.PUBLIC_URL}/hotelmap.png`} alt="Error displaying logo"></img>
//                     <div className="Location">366 Entertainment District, Singapore, 238904</div>
//                 </div>
//             </div>    
//             <div className="HotelDetails">
//                 <h1 className="HotelName">Hotel Name</h1>
//                 <div>Rating</div>
//                 <div>
//                     <div className="numberrating">9.2</div>
//                     <div className="wordrating">Excellent</div>
//                 </div>
//                 <div class="reviews">See all reviews &gt;</div>
//                 <div className="Amenities">
//                     <h3>Polular Amenities</h3>
//                     <div className="BarContainer">
//                         <img className="Bar" src={`${process.env.PUBLIC_URL}/bar.png`} alt="Error displaying logo"></img>
//                         Bar
//                     </div>
//                     <div className="SwimmingContainer">
//                         <img className="Swimming" src={`${process.env.PUBLIC_URL}/swimming.png`} alt="Error displaying logo"></img>
//                         Pool
//                     </div>
//                     <div className="AirConContainer">
//                         <img className="AirCon" src={`${process.env.PUBLIC_URL}/air-conditioner.png`} alt="Error displaying logo"></img>
//                         Air Conditioning
//                     </div>
//                     <div className="GymContainer">
//                         <img className="Gym" src={`${process.env.PUBLIC_URL}/gym.png`} alt="Error displaying logo"></img>
//                         Gym
//                     </div>
//                     <div className="BreakfastContainer">
//                         <img className="Breakfast" src={`${process.env.PUBLIC_URL}/coffee.png`} alt="Error displaying logo"></img>
//                         Breakfast Available
//                     </div>
//                     <div className="FrontDeskContainer">
//                         <img className="FrontDesk" src={`${process.env.PUBLIC_URL}/frontdesk.png`} alt="Error displaying logo"></img>
//                         24/7 Front Desk
//                     </div>
//                 </div>
//                 <div className="ChooseRoom">
//                     <h1>Choose Your Room</h1>
//                     <RoomSearchBar/>
//                     <div>
//                         <button className="AllRoom">All Rooms</button>
//                         <button className="OneBed">1 Bed</button>
//                         <button className="TwoBeds">2 Beds</button>
//                     </div>
//                     <div className="Room1">
//                         <img className="Onsuite" src={`${process.env.PUBLIC_URL}/bedroom1.jpg`} alt="Error displaying logo"></img>
//                         <div className="RoomDetail">Premium Room, 1 Queen Bed, City View</div>
//                         <div className="wificontainer">
//                             <img className="wifi" src={`${process.env.PUBLIC_URL}/wifi.png`} alt="Error displaying logo"></img>
//                             Free Wifi
//                         </div>
//                         <div className="citycontainer">
//                             <img className="cityview" src={`${process.env.PUBLIC_URL}/city.png`} alt="Error displaying logo"></img>
//                             City View
//                         </div>
//                         <div className="squareftcontainer">
//                             <img className="squareft" src={`${process.env.PUBLIC_URL}/squareft.png`} alt="Error displaying logo"></img>
//                             19 sq m
//                         </div>
//                         <div className="bedcontainer">
//                             <img className="bed"src={`${process.env.PUBLIC_URL}/bed.png`} alt="Error displaying logo"></img>
//                             1 Queen Bed
//                         </div>
//                         <div className="Price">Price</div>
//                         <button className="Reserve" onClick={handleReserveClick}>Reserve</button>
//                     </div>
//                 </div>
//                 <div className="Room2">
//                         <img className="NormalRoom" src={`${process.env.PUBLIC_URL}/bedroom2.jpg`} alt="Error displaying logo"></img>
//                         <div className="RoomDetail">Premium Room, 1 Twin Bed</div>
//                         <div className="wificontainer">
//                             <img className="wifi" src={`${process.env.PUBLIC_URL}/wifi.png`} alt="Error displaying logo"></img>
//                             Free Wifi
//                         </div>
//                         <div className="citycontainer">
//                             <img className="cityview" src={`${process.env.PUBLIC_URL}/city.png`} alt="Error displaying logo"></img>
//                             City View
//                         </div>
//                         <div className="squareftcontainer">
//                             <img className="squareft" src={`${process.env.PUBLIC_URL}/squareft.png`} alt="Error displaying logo"></img>
//                             19 sq m
//                         </div>
//                         <div className="bedcontainer">
//                             <img className="bed"src={`${process.env.PUBLIC_URL}/bed.png`} alt="Error displaying logo"></img>
//                             1 Queen Bed
//                         </div>
//                         <div className="Price">Price</div>
//                         <button className="Reserve" onClick={handleReserveClick}>Reserve</button>
//                     </div>
//                     <div className="Room3">
//                         <img className="QueenBed" src={`${process.env.PUBLIC_URL}/bedroom.jpg`} alt="Error displaying logo"></img>
//                         <div className="RoomDetail">Premium Room, 1 Queen Bed, City View</div>
//                         <div className="wificontainer">
//                             <img className="wifi" src={`${process.env.PUBLIC_URL}/wifi.png`} alt="Error displaying logo"></img>
//                             Free Wifi
//                         </div>
//                         <div className="citycontainer">
//                             <img className="cityview" src={`${process.env.PUBLIC_URL}/city.png`} alt="Error displaying logo"></img>
//                             City View
//                         </div>
//                         <div className="squareftcontainer">
//                             <img className="squareft" src={`${process.env.PUBLIC_URL}/squareft.png`} alt="Error displaying logo"></img>
//                             19 sq m
//                         </div>
//                         <div className="bedcontainer">
//                             <img className="bed"src={`${process.env.PUBLIC_URL}/bed.png`} alt="Error displaying logo"></img>
//                             1 Queen Bed
//                         </div>
//                         <div className="Price">Price</div>
//                         <button className="Reserve" onClick={handleReserveClick}>Reserve</button>
//                     </div>
//                 </div>
//             </div>

//     );
// }

// export default HotelDetailPage;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Hotel, fetchHotel } from '../models/hotel.js'; // Adjust the path as needed
import './hotelDetailPage.css';

const HotelDetailPage = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getHotelDetails = async () => {
      try {
        const hotelData = await fetchHotel(id);
        setHotel(hotelData);
        setLoading(false);
      } catch (error) {
        setError('Failed to load hotel details.');
        setLoading(false);
      }
    };

    getHotelDetails();
  }, [id]);

  if (loading) return <div className='Loading'>Loading...</div>;
  if (error) return <div className='Error'>{error}</div>;

  return (
    <div className='HotelDetailPage'>
      {hotel ? (
        <>
          <h1>{hotel.name}</h1>
          <p>{hotel.description}</p>
          <p>Rating: {hotel.rating}</p>
          <p>Address: {hotel.address}</p>
          <p>Amenities: {hotel.amenities.join(', ')}</p>
          <img src={hotel.image_details.url} alt={hotel.name} />
          {/* Add more hotel details as needed */}
        </>
      ) : (
        <div>No hotel details found.</div>
      )}
    </div>
  );
};

export default HotelDetailPage;
