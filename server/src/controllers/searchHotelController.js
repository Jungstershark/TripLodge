import { Hotel, fetchHotelsByDestination, fetchHotel } from "../models/hotel.js"; 
import { HotelPrice, fetchHotelPricesByDestination } from "../models/hotelPrice.js";
import { Room, fetchRoomPrices } from "../models/room.js";

// Arguments in URL path (e.g. /:id) can be taken from req.params (e.g. req.params.id)
// Query arguments (e.g. /hotel?id=1) can be taken from req.query (e.g. req.query.id)
// Arguments in POST request body can be taken from req.body (e.g. req.body.name)
// Unpack like this: const { priceRange, rating } = req.query; (names on left must match actual keys)

// TODO: handle filtering

async function searchHotelByDestination(req, res, next) {

    const id  = req.params.id; // Destination ID
    const {checkin, checkout, lang, currency, guests} = req.body;
    
    // Get list of hotels (and prices) from given destination
    const [hotelsMap, hotelPricesMap] = await Promise.all([getCacheHotelsByDestination(id), 
        fetchHotelPricesByDestination(id, checkin, checkout, lang, currency, guests)]); // concurrent API fetch calls

    // Further filter list of hotels accordingly
    const filters = req.body.filters; // filters object (null means no filters)
    const result = placeholderFilterHotels({ // TODO: SWITCH AWAY FROM PLACEHOLDER
        hotelsMap: hotelsMap,
        hotelPricesMap: hotelPricesMap
    }, filters);

    res.set('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.json(result);
}

async function searchHotelById(req, res, next) {
    
    const id = req.params.id; // Hotel ID (not destination id!)
    const {destination_id, checkin, checkout, lang, currency, guests} = req.body;

    const [hotel, roomList] = await Promise.all([fetchHotel(id), 
        fetchRoomPrices(id, destination_id, checkin, checkout, lang, currency, guests)]);

    result = {
        hotel: hotel,
        rooms: roomList
    };
    
    res.set('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.json(result);
}

// Cache System
let destinationCache = {}; // In-memory cache for list of hotels obtained from fetchHotelsByDestination (persists as long as server is running)
async function getCacheHotelsByDestination(id) {
    if (!destinationCache[id]) { // If destination not in cache
        // Save to cache
        destinationCache[id] = await fetchHotelsByDestination(id);
        console.log(`Destination ${id} cached`);
    } else {
        console.log(`Cache accessed: destination ${id}`);
    }

    return destinationCache[id];
}

function filterHotels(hotelInfo, filters) {
    // hotelInfo will be an object with two key-value pairs: a map of hotels & a map of hotel prices
    // Note: both maps likely not of the same length because the latter is obtained with further constraints (e.g. check in and check out date)
    const {hotelsMap, hotelPricesMap} = hotelInfo;
    
    // We search for valid hotels amongst the HotelPrices instances since those are further constrained (we only use map of hotels to get hotel info)

    // Possible filters: by ratings, guest ratings, price range, amenities (need to discuss further)
    // Other possible filters: categories, free_cancellation
    const {starRatingFloor, priceFloor, priceCeil, amenities} = filters;

    // Convert the values in the hotel prices map (which will be the HotelPrice instances) into an array so that we can use filter() method
    const filteredHotelPricesArray = Array.from(hotelPricesMap.values()).filter(hotelPrice => hotelPrice.price < priceCeil);
    filteredHotelPricesArray.filter(hotelPrice => {
        const hotel = hotelsMap.get(hotelPrice.id); // hotel object
        return hotel.categories.overall.score >= ratingFloor;
    })
    // TODO: filter properly

    const result = []; // array
    for (const hotelPrice of filteredHotelPricesArray) {
        result.push({
            hotel: hotelsMap.get(hotelPrice.id),
            price: hotelPrice.price
        })
    }
    return result;
}


// PLACEHOLDER FOR TESTING
function placeholderFilterHotels(hotelInfo, filters) {
    const {hotelsMap, hotelPricesMap} = hotelInfo;
    const result = []; // array
    for (const hotelPrice of Array.from(hotelPricesMap.values())) {
        result.push({
            hotel: hotelsMap.get(hotelPrice.id),
            price: hotelPrice.price
        })
    }
    return result;
}

export { searchHotelByDestination, searchHotelById };