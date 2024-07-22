import express from 'express';
import { getHotelsByDestination, getHotelById, getAllHotels } from '../../models/hotel.js';

const router = express.Router();

router.get('/top3', async (req, res) => {
  try {
    const hotels = await getHotelsByDestination({ destination_id: 'WD0M' });
    const top3Hotels = hotels.slice(0, 3); // Assuming hotels are sorted by some criteria
    res.render('hotels', { hotels: top3Hotels });
  } catch (error) {
    console.error('Error fetching hotels:', error);
    res.status(500).json({ error: 'Error fetching hotels' });
  }
});


// Render the search form for destination ID
router.get('/search/destination', (req, res) => {
  res.render('searchDestination');
});

// Handle the destination ID search and display results
router.get('/results/destination', async (req, res) => {
  const { destination_id } = req.query;
  try {
    const hotels = await getHotelsByDestination({ destination_id });
    res.render('hotels', { hotels });
  } catch (error) {
    console.error('Error fetching hotels:', error);
    res.status(500).json({ error: 'Error fetching hotels' });
  }
});

// Render the search form for hotel ID
router.get('/search/hotel', (req, res) => {
  res.render('searchHotel');
});

// Handle the hotel ID search and display results
router.get('/results/hotel', async (req, res) => {
  const { hotel_id } = req.query;
  try {
    const hotel = await getHotelById({ hotel_id });
    res.render('hotelDetail', { hotel });
  } catch (error) {
    console.error('Error fetching hotel details:', error);
    res.status(500).json({ error: 'Error fetching hotel details' });
  }
});

// Fetch and display all hotels
router.get('/', async (req, res) => {
  try {
    const hotels = await getAllHotels();
    res.render('hotels', { hotels });
  } catch (error) {
    console.error('Error fetching all hotels:', error);
    res.status(500).json({ error: 'Error fetching all hotels' });
  }
});

export default router;