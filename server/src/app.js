import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import express, { json } from 'express';
import db from './models/db.js';
import cors from 'cors';
import { fileURLToPath } from 'url'; // Import to get the directory name of the current module
import { dirname } from 'path'; // Import to manipulate file paths

// Route imports
import searchHotelRouter from './routes/search.js';
import indexRouter from './routes/index.js';
import bookingRouter from './routes/booking.js';
import checkoutRouter from './routes/checkout.js';
import authRoutes from './routes/authRoutes.js';

// Convert the module URL to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Define server for shutdown handling
const server = app.listen(process.env.PORT || 5000, () => {
    console.log(`App listening at port ${process.env.PORT || 5000}`);
});

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

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // Corrected path joining

// Setup routes
app.use('/', indexRouter);
app.use('/search', searchHotelRouter);
app.use('/booking', bookingRouter);
app.use('/checkout', checkoutRouter);
app.use('/api/auth', authRoutes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.json({
        success: false,
        message: err.message
    });
});

export default app;
