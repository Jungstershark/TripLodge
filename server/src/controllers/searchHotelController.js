import { Hotel, fetchHotelsByDestination, fetchHotel } from "../models/hotel.js"; 
import { HotelPrice, fetchHotelPricesByDestination } from "../models/hotelPrice.js";
import { Room, fetchRoomPrices } from "../models/room.js";

// Arguments in URL path (e.g. /:id) can be taken from req.params (e.g. req.params.id)
// Query arguments (e.g. /hotel?id=1) can be taken from req.query (e.g. req.query.id)
// Arguments in POST request body can be taken from req.body (e.g. req.body.name)
// Unpack like this: const { priceRange, rating } = req.query; (names on left must match actual keys)

async function searchHotelByDestination(req, res, next) {

    const id  = req.params.id; // Destination ID
    const {checkin, checkout, lang, currency, guests, limit,page = 1} = req.body;
    
    // Get list of hotels (and prices) from given destination
    const [hotelsMap, hotelPricesMap] = await Promise.all([cacheFetchHotelByDestination(id), 
        fetchHotelPricesByDestination(id, checkin, checkout, lang, currency, guests)]); // concurrent API fetch calls
    const result = []; // array
    for (const hotelPrice of Array.from(hotelPricesMap.values())) {
        // For some reason, some hotelPrice objects have hotel IDs without corresponding hotel information (from destination search API call)
        // We will ignore those entries

        if (hotelsMap.has(hotelPrice.id)) { // does this cause slowdown
            result.push({
                hotel: hotelsMap.get(hotelPrice.id),
                price: hotelPrice.price
            })
        }
    }
    
    // Apply pagination if limit is provided
    let paginatedResult = result;
    if (limit) {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        paginatedResult = result.slice(startIndex, endIndex);
    }

    // Note: hotelPrice instance has distance attribute which hotel instance does not have for some reason (from Ascenda API)
    // If this is useful, will need to extract from hotelPrice

    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.json(paginatedResult);
}

async function searchHotelById(req, res, next) {
    
    const id = req.params.id; // Hotel ID (not destination id!)
    const {destination_id, checkin, checkout, lang, currency, guests} = req.body;

    const [hotel, roomList] = await Promise.all([cacheFetchHotelById(id), 
        fetchRoomPrices(id, destination_id, checkin, checkout, lang, currency, guests)]);

    const result = {
        hotel: hotel,
        rooms: roomList
    };
    
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.json(result);
}

// Cache System
let destinationCache = {}; // In-memory cache for list of hotels obtained from fetchHotelsByDestination (persists as long as server is running)
async function cacheFetchHotelByDestination(id) {
    if (!destinationCache[id]) { // If destination not in cache
        // Save to cache
        destinationCache[id] = await fetchHotelsByDestination(id);
        console.log(`Destination ${id} cached`);
    } else {
        console.log(`Cache accessed: destination ${id}`);
    }

    return destinationCache[id];
}

let hotelCache = {}; // In-memory cache for specific hotel object
async function cacheFetchHotelById(id) {
    if (!hotelCache[id]) { // If specific hotel not in cache
        // Save to cache
        hotelCache[id] = await fetchHotel(id);
        console.log(`Hotel ${id} cached`);
    } else {
        console.log(`Cache accessed: hotel ${id}`);
    }

    return hotelCache[id];
}

export { searchHotelByDestination, searchHotelById };