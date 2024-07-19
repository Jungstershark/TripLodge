import express from 'express';
import { getHotelPrices, getHotelPriceById } from '../models/prices.js';

const router = express.Router();

// Render the form page with dropdowns
router.get('/', (req, res) => {
  res.render('prices/filterPrices'); // Render the EJS template with dropdowns
});

// Handle form submission and fetch hotel prices based on selected filters
router.get('/results', async (req, res) => {
  const { destination_id, checkin, checkout, lang, currency, guests } = req.query;
    console.log(req.query);
  // Validate required query parameters
  if (!destination_id || !checkin || !checkout || !lang || !currency || !guests) {
    return res.status(400).json({ error: 'Missing required query parameters' });
  }

  try {
    const prices = await getHotelPrices({ destination_id, checkin, checkout, lang, currency, guests });
    res.render('prices/displayPrices', { prices }); // Render the results on another EJS template
  } catch (error) {
    console.error('Error fetching hotel prices:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// UNTESTED
// // Handle request to fetch price for a specific hotel
// router.get('/:id/prices', async (req, res) => {
//   const { id } = req.params;
//   const { destination_id, checkin, checkout, lang, currency, guests } = req.query;

//   // Validate required query parameters
//   if (!destination_id || !checkin || !checkout || !lang || !currency || !guests) {
//     return res.status(400).json({ error: 'Missing required query parameters' });
//   }

//   try {
//     const priceDetails = await getHotelPriceById({ id, destination_id, checkin, checkout, lang, currency, guests });
//     res.render('displayPriceDetails', { priceDetails }); // Render the results on another EJS template
//   } catch (error) {
//     console.error('Error fetching hotel price details:', error.message);
//     res.status(500).json({ error: error.message });
//   }
// });

export default router;
