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
 * @param {number} [maxPollCount=10] - Maximum number of times to poll API until response's 'completed' flag is true
 * @param {number} [pollInterval=500] - Time in milliseconds between each API poll (when response's 'completed' flag is false)
 * @returns {Promise<Room[]>} A promise that resolves to an array of Room instances.
 * @throws Will throw an error if the request fails.
 */
async function fetchRoomPrices(id, destination_id, checkin, checkout, lang, currency, guests, pollInterval=500, maxPollCount=10) {
    try {

        let isFetchComplete = false; 
        let response = null;
        let pollCount = 0; // number of times API is polled

        while (!isFetchComplete) {
            // GET hotel price from API
            response = await axios.get(ascendaAPI.getHotelPrice(id), {
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

            isFetchComplete = response.data.completed;
            pollCount += 1;

            if (isFetchComplete==false) {
                if (pollCount >= maxPollCount) { throw new Error("Exceeded API poll limit."); }
                
                // Repoll after specified interval (in milliseconds)
                await new Promise(resolve => setTimeout(resolve, pollInterval)); 
            }
        }
        
        const roomPricesData = response.data.rooms;

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
        
        console.log(`API polled ${pollCount} time(s)`);
        return roomList;

    } catch(error) {
        if (error.response && error.response.status === 422) {
            console.log('Ascenda API returned a 422 status:', error.response.data);
            return []; 
        } else if (error.message == "Exceeded API poll limit.") {
            console.log(error.message);
            return [];
        } else {
            console.error("Error fetching room prices of given hotel:", error);
            throw error;
        }
    }
}

export { Room, fetchRoomPrices };

