import express, { json } from 'express';
import 'dotenv/config'

// Routes imports
import hotelRouter from '../routes/hotel.js'

const app = express();

app.use(json());

const PORT = process.env.PORT || 5000;

app.get('/', async (req, res) => {
    res.json({ status: true, message: "Our node.js app works" })
});

app.use('/hotel', hotelRouter);

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));