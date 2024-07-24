import express from 'express';
import { searchHotelByDestination, searchHotelById } from '../controllers/searchHotelController.js'; 


const router = express.Router();

router.post('/destination/:id', searchHotelByDestination); // Search for list of Hotels

router.post('/hotel/:id', searchHotelById); // Specific hotel details with room information

export default router;