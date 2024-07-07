import express from 'express';
import fetch from 'node-fetch';
import { ascendaAPI } from '../config.js'; // Adjust the path as necessary

const router = express.Router();

// // relative path to manage-booking/
// router.get('/:id', async function(req, res, next) {
//   const hotelId = req.params.id;
//   const apiUrl = `${ascendaAPI.baseUrl}${ascendaAPI.endpoints.getHotelInfo(hotelId)}`
//   try {
//     const response = await axios.get(apiUrl);
//     res.json(response.data);
//   } catch (error) {
//       res.status(500).json({ error: error.message });
//   } 
// });


router.get('/top3', async (req, res) => {
  try {
    const response = await fetch(`${ascendaAPI.baseUrl}${ascendaAPI.endpoints.hotelInfoByDestination}?destination_id=WD0M`);
    const hotels = await response.json();

    // Assuming hotels are sorted by some criteria, we pick the top 3
    const top3Hotels = hotels.slice(0, 3);

    res.json(top3Hotels);
  } catch (error) {
    console.error('Error fetching hotels:', error);
    res.status(500).json({ error: 'Error fetching hotels' });
  }
});

export default router;