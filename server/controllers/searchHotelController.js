import { Hotel, fetchHotelsByDestination, fetchHotel } from "../models/hotel.js"; 
import { HotelPrice, fetchHotelPricesByDestination } from "../models/hotelPrice.js";
import { Room, fetchRoomPrices } from "../models/room.js";

// We can set up a cache system like so:
let destinationCache = {}; // In-memory cache
// Whenever we fetch list of hotels from searchHotelByDestination, we can cache it


// Arguments in URL path (e.g. /:id) can be taken from req.params (e.g. req.params.id)
// Query arguments (e.g. /hotel?id=1) can be taken from req.query (e.g. req.query.id)
// Arguments in POST request body can be taken from req.body (e.g. req.body.name)
// Unpack like this: const { priceRange, rating } = req.query; (names on left must match actual keys)

// TODO: handle filtering

async function searchHotelByDestination(req, res, next) {

    const id  = req.params.id; // Destination ID
    const {checkin, checkout, lang, currency, guests} = req.body;
    
    // Get list of hotels (and prices) from given destination
    if (!destinationCache[id]) { // If destination not in cache
        // Make API fetch calls concurrently:
        const [hotelsMap, hotelPricesMap] = await Promise.all([fetchHotelsByDestination(id), 
            fetchHotelPricesByDestination(id, checkin, checkout, lang, currency, guests)]);

        // Save to cache
        destinationCache[id] = {
            hotels: hotelsMap,
            hotelPrices: hotelPricesMap 
        }; 
        console.log(`Destination ${id} cached`);
    } else {
        console.log(`Cache accessed: destination ${id}`);
    }

    // Further filter list of hotels accordingly
    const filters = req.body.filters; // filters object (null means no filters)
    const result = filterHotels(destinationCache[id], filters);

    res.set('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.json(result);
}

async function searchHotelById(req, res, next) {
    
    const id = req.params.id; // Hotel ID (not destination id!)
    const {destination_id, checkin, checkout, lang, currency, guests} = req.body;

    //const hotel = await fetchHotel(id);

    const [hotel, roomList] = await Promise.all([fetchHotel(id), 
        fetchRoomPrices(id, destination_id, checkin, checkout, lang, currency, guests)]);

    result = {
        hotel: hotel,
        rooms: roomList
    };
    
    res.set('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.json(result);
}

function filterHotels(hotelInfo, filters) {
    /**
     * Filter
     */
}

export { searchHotelByDestination, searchHotelById };