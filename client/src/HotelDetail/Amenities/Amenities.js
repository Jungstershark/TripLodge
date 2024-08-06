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
import './Amenities.css'

function Amenities({ amenities }) {
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
  };

  const amenityKeys = Object.keys(amenities);

  return (
    <div className="amenities-bar">
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
