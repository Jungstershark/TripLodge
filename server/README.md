# Hotel Booking Server
This Express.js app is the backend server for the Hotel Booking Web Application. The backend handles API requests and interacts with [replace later] database. This app is ES6 compatible.

## Install dependencies
To install all of the dependencies required 
```
npm i
npm install
```
## Run the application
### In development mode
To run the application in development mode, use the following command. This will start the server using nodemon which helps to restart our server automatically when any file changes. There will be no need to terminate and rerun the app again with every file change.

```bash
npm run dev
```

### In production mode
```
npm start
```

## API Endpoints
The port has been standardised to be localhost:3001. (This is standardised in the dotenv file). To change the port number to your preferred port edit the dotenv file.

Current active endpoints that can be tested

localhost:3001/index - (Standard express template)
localhost:3001/hotel
localhost:3001/hotel/top3 - (Retrieve top 3 records from the hotel details API)



## Acknowledgements
1. We refer to [50.003 Lecture 5.1](https://sutd50003.github.io/notes/l5_1_expressjs_backend_mongo/#to-make-the-express-app-es6-compatible-optional) to make the Express app ES6 compatible.