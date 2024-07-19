import axios from "axios";

import { ascendaAPI } from "./ascendaApi.js";

class HotelPrice {
    constructor(id, searchRank, price, market_rates) {
        // parameter names follow JSON response attribute names
        this.id = id;
        this.searchRank = searchRank;
        this.price = price;
        this.marketRates = market_rates;
    }
}

/**
 * Fetch hotel prices from a destination. 
 * @param {string} destination_id - The ID of the destination.
 * @param {string} checkin - Check in date in YYYY-MM-DD format
 * @param {string} checkout - Check out date in YYYY-MM-DD format
 * @param {string} lang - Language code (e.g. "en_US")
 * @param {string} currency - ISO code for currencies (e.g. "SGD")
 * @param {string} guests - Number of guests staying per room. If there are more than one room, append with '|' separator (e.g. "2|2")
 * @param {number} [maxPollCount=10] - Maximum number of times to poll API until response's 'completed' flag is true
 * @param {number} [pollInterval=500] - Time in milliseconds between each API poll (when response's 'completed' flag is false)
 * @returns {Promise<HotelPrice[]>} A promise that resolves to an array of HotelPrice instances.
 * @throws Will throw an error if the request fails.
 */
async function fetchHotelPricesByDestination(destination_id, checkin, checkout, lang, currency, guests, pollInterval=500, maxPollCount=10) {
    try {
        
        let isFetchComplete = false; // whether response is complete
        let response = null;
        let pollCount = 0; // number of times API is polled

        while (!isFetchComplete) {
            // GET hotel prices from API
            response = await axios.get(ascendaAPI.getHotelPricesByDestination, {
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

        const hotelPricesData = response.data.hotels; 

        // Convert each hotel price data object into a HotelPrice instance
        const hotelPricesList = hotelPricesData.map(hotel => new HotelPrice(
            hotel.id,
            hotel.searchRank,
            hotel.price,
            hotel.market_rates
        ));
        
        console.log(`API polled ${pollCount} time(s)`);
        return hotelPricesList;
        
    } catch(error) {
        console.error("Error fetching hotel prices by destination:", error);
        throw error;
    }
}

// Quick Testing
// fetchHotelPricesByDestination("WD0M","2024-10-01","2024-10-07","en_US","SGD",2).then((result) => {
//     console.log(result.length);
// });


export { HotelPrice, fetchHotelPricesByDestination };

