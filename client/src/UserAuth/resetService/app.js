require ('dotenv').config()  //essential to connect mongoose
require('express-async-errors')

const express = require('express')
const app = express()
const path = require('path')

const connectDB = require('./db/connect')
const fileupload = require('express-fileupload')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');



const productRoute = require('./routes/productRoute')
const userRoute = require('./routes/userRoute')
const authRoute = require('./routes/authRoute')
const orderRoute = require('./routes/orderRoute')
const reviewRoute = require('./routes/reviewRoute')
const cartItemRoute = require('./routes/cartItemRoute')


const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization,Cookies');
  res.header('Access-Control-Allow-Credentials', true);
  next();
})

const port = process.env.PORT  || 4000;

app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))
app.use(express.static('./public')) //make a folder accesible to the public, this time the public folder is used to store image uploads, other time it's for frontend use
app.use(fileupload())
// app.use(express.static(path.resolve(__dirname, './client/dist'))) //connect to react front-end


app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(
    helmet.contentSecurityPolicy({
      useDefaults: true,
      directives: {
        "img-src": ["'self'", "https: data:"]
      }
    })
  )
app.use(cors());
// app.use(xss());
app.use(mongoSanitize());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
}));

app.use('/api/v1/product', productRoute)
app.use('/api/v1/user', userRoute)
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/order', orderRoute)
app.use('/api/v1/review', reviewRoute)
app.use('/api/v1/cart', cartItemRoute)


// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'))
// })


//NEED THESE TWO MIDDLEWARES TO DISPLAY ERROR, PLACE THIS UNDER the app.get() to connect to client
app.use(notFoundMiddleware) //THE ORDER IS IMPORTANT, NOT FOUND MUST BE PLACED BEFORE ERRORHANDLER because errorhandler only works with existing route, if a route does not exist it needs to run through the notfound middleware first
app.use(errorHandlerMiddleware)


const start = async () => {
    try {
        await connectDB(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
        app.listen(
            port, () => {
                console.log(`Server listening on port ${port}`)
            }
        )
    }
    catch(error){
        console.log(error)
    }
}

start()