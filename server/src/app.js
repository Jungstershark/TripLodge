import express, { json } from 'express';

// Routes imports
import accountRouter from '../routes/account.js'
import bookingRouter from '../routes/booking.js'

const app = express();

app.use(json());

const PORT = process.env.PORT || 5000;

app.get('/', async (req, res) => {
    res.json({ status: true, message: "Our node.js app works" })
});

app.use('/manage-account', accountRouter);
app.use('/manage-booking', bookingRouter);

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));