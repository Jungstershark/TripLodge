import axios from "axios";

import { ascendaAPI } from "./ascendaApi.js";

class Room {
    constructor(id, key, roomNormalizedDescription, free_cancellation, roomDescription, long_description, images, amenities, price, market_rates) {
        // parameter names follow JSON response attribute names
        this.hotelId = id; // Hotel ID (not part of response object)
        this.key = key;
        this.roomNormalizedDescription = roomNormalizedDescription;
        this.freeCancellation = free_cancellation;
        this.roomDescription = roomDescription; // Following handout but is this really necessary? (if we already have normalized description)
        this.longRoomDescription = long_description;
        this.images = images;
        this.amenities = amenities;
        this.price = price;
        this.marketRates = market_rates;
    }
}

/**
 * Fetch room prices of given hotel. 
 * @param {string} id - The ID of the hotel.
 * @param {string} destination_id - The ID of the destination.
 * @param {string} checkin - Check in date in YYYY-MM-DD format
 * @param {string} checkout - Check out date in YYYY-MM-DD format
 * @param {string} lang - Language code (e.g. "en_US")
 * @param {string} currency - ISO code for currencies (e.g. "SGD")
 * @param {string} guests - Number of guests staying per room. If there are more than one room, append with '|' separator (e.g. "2|2")
 * @param {number} [poll_idx=0] - The index position to start constructing HotelPrice instances from the result array. This is used because this function may be called multiple times to re-poll the API (until completed flag is true)
 * @returns {Promise<Room[]>} A promise that resolves to an array of Room instances.
 * @throws Will throw an error if the request fails.
 */
async function fetchRoomPrices(id, destination_id, checkin, checkout, lang, currency, guests, poll_idx=0) {
    try {
        // GET hotel price from API
        const response = await axios.get(ascendaAPI.getHotelPrice(id), {
            params: {
                destination_id: destination_id,
                checkin: checkin,
                checkout: checkout,
                lang: lang,
                currency: currency,
                guests: guests,
                partner_id: 1
            }
        }); 
        const isFetchComplete = response.data.completed; // TODO: handling if fetch is incomplete
        const roomPricesData = response.data.rooms.slice(poll_idx);

        // Convert each room prices data object into a Room instance
        const roomList = roomPricesData.map(room => new Room(
            id,
            room.key,
            room.roomNormalizedDescription,
            room.free_cancellation,
            room.roomDescription,
            room.long_description,
            room.images,
            room.amenities,
            room.price,
            room.market_rates
        ));
        
        return {
            isFetchComplete: isFetchComplete,
            roomList: roomList
        }
    } catch(error) {
        console.error("Error fetching room prices of given hotel:", error);
        throw error;
    }
}

// Quick Testing
// fetchRoomPrices("diH7","WD0M","2024-10-01","2024-10-07","en_US","SGD",2).then((result) => {
//     console.log(result.isFetchComplete);
//     console.log(result.roomList.length);
// });

export { Room, fetchRoomPrices };

