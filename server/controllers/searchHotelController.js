import { Hotel, fetchHotelsByDestination, fetchHotel } from "../models/hotel.js"; 

// We can set up a cache system like so:
let hotelListCache = {}; // In-memory cache
// Whenever we fetch list of hotels from searchHotelByDestination, we can cache it


// Arguments in URL path (e.g. /:id) can be taken from req.params (e.g. req.params.id)
// Query arguments (e.g. /hotel?id=1) can be taken from req.query (e.g. req.query.id)
// Arguments in POST request body can be taken from req.body (e.g. res.body.name)
// Unpack like this: const { priceRange, rating } = req.query; (names on left must match actual keys)

// TODO: handle filtering

async function searchHotelByDestination(req, res, next) {

    const { id } = req.params;
    console.log("destination id:", id);

    const hotelList = await fetchHotelsByDestination(id);
    console.log(hotelList);
    
    res.set('Access-Control-Allow-Origin', 'http://localhost:5000');
    //res.json(hotelList);
    res.send(`${JSON.stringify(hotelList)}`);
}

async function searchHotelById(req, res, next) {
    const { id } = req.param;
    const hotelList = await fetchHotel(id);

    res.set('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.send(`${JSON.stringify(hotelList)}`);
}

export { searchHotelByDestination, searchHotelById };