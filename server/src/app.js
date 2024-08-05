import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import process from 'process';
import express, { json } from 'express';
import db from './models/db.js';
import cors from 'cors';
// Routes imports
import searchHotelRouter from './routes/search.js';
import indexRouter from './routes/index.js';
import bookingRouter from './routes/booking.js';
import authRoutes from './routes/authRoutes.js';  // Add this line

const app = express();

// Ensure proper shutdown and cleanup
process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Process terminated');
        db.cleanup();
    });
});

process.on('SIGINT', () => {
    server.close(() => {
        console.log('Process interrupted');
        db.cleanup();
    });
});

app.use(json());
app.use(cors({
    origin: 'http://localhost:3000', // Your React app URL
}));

const PORT = process.env.PORT || 5000;

app.get('/', async (req, res) => {
    res.json({ status: true, message: "Our node.js app works" })
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(path.dirname(''), 'public')));

// setup routes
app.use('/', indexRouter);
app.use('/search', searchHotelRouter);
app.use('/booking', bookingRouter);
app.use('/api/auth', authRoutes);  // Add this line

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
    });

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // send error response as JSON
    res.status(err.status || 500);
    res.json({
        success: false,
        message: err.message
    });
});

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));

export default app;