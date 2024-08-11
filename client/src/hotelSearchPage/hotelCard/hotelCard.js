import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Box, Button } from '@mui/material';
import { Rating } from '@mui/material';

const HotelCard = ({ hotel, hotelImage, destinationId, checkin, checkout, guests, numAdults, numChildren, numRooms }) => {
  const navigate = useNavigate();

  const handleCheckAvailability = () => {
    // console.log("I am displaying hotel here", hotel);
    // console.log("This is for the testing", hotel.hotel.id);
    // console.log(`Navigating to /hotel/${hotel.hotel.id}`); // Debugging log

    navigate(`/hotel/${hotel.hotel.id}`, {
      state: { destinationId, checkin, checkout, guests, numAdults, numChildren, numRooms }
    });
  };

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', mb: 2, maxWidth: 850 }}>
      <CardMedia
        component="img"
        sx={{ width: 250, height: 200 }}
        image={hotelImage}
        alt={hotel.hotel.name}
      />
      <Box sx={{ display: 'flex', flexDirection: 'row', ml: 2, flex: 1 }}>
        <CardContent sx={{ flex: '1 0 auto', maxWidth: '60%' }}>
          <Typography
            component="div"
            variant="h6"
            sx={{
              marginBottom: 0.5,
              whiteSpace: 'nowrap', // Prevent wrapping
              overflow: 'hidden',
              textOverflow: 'ellipsis', // Show ellipsis for overflow text
            }}
          >
            {hotel.hotel.name}
          </Typography>
          <Rating name="read-only" value={hotel.hotel.rating} readOnly sx={{ marginBottom: 1 }} />
          <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ marginBottom: 1 }}>
            {hotel.hotel.address}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', pb: 1 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', mr: 2 }}>
            <Typography 
              variant="h5"
              sx={{
                marginRight: 5,
                whiteSpace: 'nowrap', // Prevent wrapping
                overflow: 'hidden',
                textOverflow: 'ellipsis', // Show ellipsis for overflow text
              }}
            >
              ${hotel.price}
            </Typography>
            <Button 
              variant="contained" 
              sx={{
                borderRadius: 1.5,
                marginTop: 1.3, 
                padding: '8px 16px', // Adjust padding for better button size
                backgroundColor: '#3473D1', // Background color
                color: '#ffffff', // Text color
                '&:hover': {
                  backgroundColor: '#5093E0' // Color on hover
                }
              }}
              onClick={handleCheckAvailability}
            >
              Check availability
            </Button>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default HotelCard;
