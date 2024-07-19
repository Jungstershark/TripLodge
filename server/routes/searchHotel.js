import express from 'express';
import { searchHotelByDestination, searchHotelById } from '../controllers/searchHotelController.js'; 


const router = express.Router();

router.get('/destination/:id', searchHotelByDestination);

router.get('/hotel/:id', searchHotelById);



// router.post('/submit/', async function(req, res, next) {
//     const name = req.body.name;
//     const code = req.body.code;
//     await staffModel.insertOne(staffModel.Staff.newStaff(name, code));
//     const staffs = await staffModel.all();
//     res.set('Access-Control-Allow-Origin', 'http://localhost:5000');
//     res.send(`${JSON.stringify(staffs)}`);
// })

export default router;