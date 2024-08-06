import React from 'react'
import Amenities from '../Amenities/Amenities'

function HotelDetailCard(filteredRooms) {
    const rooms = filteredRooms.filteredRooms
    return (
      <div className="AllRoomsContainer">
        {rooms.map((room, index) => (
            <div key={index} className={`Room${index + 1}`}>
                <img className="Onsuite" src={`${process.env.PUBLIC_URL}/bedroom1.jpg`} alt={room.roomDescription} />
                <Amenities amenities={room.amenities} HotelDetailCard={true}/>
                <div className="Price">Price of Room: {room.price}</div>
                <div className="NoOfRoom">1 room</div>
                <div className='tax'>includes taxes & fees</div>
                {/* <button className="Reserve" onClick={()=>handleReserveClick(room)}>Reserve</button> */}
            </div>
        ))}
    </div> 
    )
}

export default HotelDetailCard
