import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import process from 'process';
import express, { json } from 'express';
import db from './models/db.js';
import 'dotenv/config'

// Routes imports
import searchHotelRouter from './routes/search.js'
import indexRouter from './routes/index.js';
import bookingRouter from './routes/booking.js'

const app = express();

process.on("SIGINT", db.cleanup);
process.on("SIGTERM", db.cleanup);

app.use(json());

const PORT = process.env.PORT || 5000;

app.get('/', async (req, res) => {
    res.json({ status: true, message: "Our node.js app works" })
});

// view engine setup
app.set('views', path.join(path.dirname(''), 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(path.dirname(''), 'public')));

// setup routes
app.use('/', indexRouter);
app.use('/search', searchHotelRouter);
app.use('/booking', bookingRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
    });

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    
    // render the error page
    res.status(err.status || 500);
    res.render('error');
    });

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));

export default app;