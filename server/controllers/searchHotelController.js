import { Hotel, fetchHotelsByDestination, fetchHotel } from "../models/hotel.js"; 

// We can set up a cache system like so:
let destinationCache = {}; // In-memory cache
// Whenever we fetch list of hotels from searchHotelByDestination, we can cache it


// Arguments in URL path (e.g. /:id) can be taken from req.params (e.g. req.params.id)
// Query arguments (e.g. /hotel?id=1) can be taken from req.query (e.g. req.query.id)
// Arguments in POST request body can be taken from req.body (e.g. res.body.name)
// Unpack like this: const { priceRange, rating } = req.query; (names on left must match actual keys)

// TODO: handle filtering

async function searchHotelByDestination(req, res, next) {

    const { id } = req.params;
    
    // If destination not in cache:
    if (!destinationCache[id]) {
        console.log(`Destination ${id} cached`);
        destinationCache[id] = await fetchHotelsByDestination(id); // add to cache
    } else {
        console.log(`Destination ${id} already in cache`);
    }

    res.set('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.json(destinationCache[id]);
}

async function searchHotelById(req, res, next) {
    const { id } = req.params;
    const hotel = await fetchHotel(id);
    
    res.set('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.json(hotel);
}

export { searchHotelByDestination, searchHotelById };