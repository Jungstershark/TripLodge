import express from 'express';
import { dummySearch, searchHotelByDestination, searchHotelById } from '../controllers/searchHotelController.js'; 


const router = express.Router();

router.post('/destination/:id', searchHotelByDestination); // Search for list of Hotels

router.get('/hotel/:id', searchHotelById); // Specific hotel details with room information



// router.post('/submit/', async function(req, res, next) {
//     const name = req.body.name;
//     const code = req.body.code;
//     await staffModel.insertOne(staffModel.Staff.newStaff(name, code));
//     const staffs = await staffModel.all();
//     res.set('Access-Control-Allow-Origin', 'http://localhost:5000');
//     res.send(`${JSON.stringify(staffs)}`);
// })

export default router;