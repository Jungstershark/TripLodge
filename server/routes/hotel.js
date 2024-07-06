import { Router } from "express";
import axios from 'axios'
import { ascendaAPI } from "../config.js";
const router = Router();

// relative path to manage-booking/
router.get('/:id', async function(req, res, next) {
  const hotelId = req.params.id;
  const apiUrl = `${ascendaAPI.baseUrl}${ascendaAPI.endpoints.getHotelInfo(hotelId)}`
  try {
    const response = await axios.get(apiUrl);
    console.log(response.data);
  } catch (error) {
      res.status(500).json({ error: error.message });
  } 
});
  
export default router;