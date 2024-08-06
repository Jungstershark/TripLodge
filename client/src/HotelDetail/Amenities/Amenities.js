import React from 'react';
import DryCleaningIcon from '@mui/icons-material/DryCleaning';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import TvIcon from '@mui/icons-material/Tv';
import PoolIcon from '@mui/icons-material/Pool';
import IronIcon from '@mui/icons-material/Iron';
import SmokeFreeIcon from '@mui/icons-material/SmokeFree';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import LockIcon from '@mui/icons-material/Lock';
import WifiIcon from '@mui/icons-material/Wifi';
import './Amenities.css';

function Amenities({ amenities, HotelDetailCard }) {
  const amenitiesIconMap = {
    dryCleaning: { text: 'Dry Cleaning', component: <DryCleaningIcon /> },
    airConditioning: { text: 'Air Conditioning', component: <AcUnitIcon /> },
    miniBarInRoom: { text: 'Mini Bar', component: <LocalBarIcon /> },
    roomService: { text: 'Room Service', component: <RoomServiceIcon /> },
    safe: { text: 'Safe', component: <LockIcon /> },
    clothingIron: { text: 'Iron', component: <IronIcon /> },
    parkingGarage: { text: 'Parking', component: <LocalParkingIcon /> },
    tVInRoom: { text: 'TV', component: <TvIcon /> },
    outdoorPool: { text: 'Pool', component: <PoolIcon /> },
    smokeFree: { text: 'Smoke Free', component: <SmokeFreeIcon /> },
    'Free WiFi': { text: 'Free Wifi', component: <WifiIcon /> },
    'Non-Smoking': { text: 'Non-Smoking', component: <SmokeFreeIcon /> },
    'Air conditioning': { text: 'Air Conditioning', component: <AcUnitIcon /> },
    'Television': { text: 'Television', component: <TvIcon /> },
    'Room service (24 hours)': { text: '24/7 Room Service', component: <RoomServiceIcon /> }
  };

  let amenityKeys;
  if (!HotelDetailCard){
    amenityKeys = Object.keys(amenities);
  } else {
    amenityKeys = amenities;
  }

  return (
    <div className={`amenities-bar ${HotelDetailCard ? 'single-column' : ''}`}>
      {amenityKeys
        .filter((key) => amenitiesIconMap[key])
        .map((key, index) => (
          <div key={index} className="amenity-item">
            {amenitiesIconMap[key].component}
            <span className="amenity-text">{amenitiesIconMap[key].text}</span>
          </div>
        ))}
    </div>
  );
}

export default Amenities;
