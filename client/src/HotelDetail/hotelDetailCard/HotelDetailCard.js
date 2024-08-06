import React from 'react'
import Amenities from '../Amenities/Amenities'
import { useNavigate } from 'react-router-dom';

function HotelDetailCard({filteredRooms, hotel, dates, guests}) {
    const rooms = filteredRooms
    console.log(rooms)
    const navigate = useNavigate();

    const handleReserveClick = (room) => {
        const dataToPass = { hotel, room, dates, guests };
        console.log(dataToPass)
        navigate('/details', { state: dataToPass });
    };
    
    return (
      <div>
        {rooms.map((room, index) => (
            <div key={index} className={`Room${index + 1}`}>
                <img className="Onsuite" src={room.images[0].url} alt={room.roomDescription} />
                <div className="RoomDetail">{room.roomDescription}</div>
                <Amenities amenities={room.amenities} HotelDetailCard={true}/>
                <div className="Price">Price of Room: {room.price}</div>
                <div className="NoOfRoom">1 room</div>
                <div className='tax'>includes taxes & fees</div>
                <button className="Reserve" onClick={()=>handleReserveClick(room)}>Reserve</button>
            </div>
        ))}
    </div> 
    )
}

export default HotelDetailCard
