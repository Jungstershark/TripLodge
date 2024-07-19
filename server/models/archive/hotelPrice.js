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
 * @param {number} [poll_idx=0] - The index position to start constructing HotelPrice instances from the result array. This is used because this function may be called multiple times to re-poll the API (until completed flag is true)
 * @returns {Promise<HotelPrice[]>} A promise that resolves to an array of HotelPrice instances.
 * @throws Will throw an error if the request fails.
 */
async function fetchHotelPricesByDestination(destination_id, checkin, checkout, lang, currency, guests, poll_idx=0) {
    try {
        // GET hotel prices from API
        const response = await axios.get(ascendaAPI.getHotelPricesByDestination, {
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
        const hotelPricesData = response.data.hotels.slice(poll_idx); 

        // Convert each hotel price data object into a HotelPrice instance (only from poll index onwards)
        const hotelPricesList = hotelPricesData.map(hotel => new HotelPrice(
            hotel.id,
            hotel.searchRank,
            hotel.price,
            hotel.market_rates
        ));
        
        return {
            isFetchComplete: isFetchComplete,
            hotelPricesList: hotelPricesList
        }
    } catch(error) {
        console.error("Error fetching hotel prices by destination:", error);
        throw error;
    }
}

// Quick Testing
// fetchHotelPricesByDestination("WD0M","2024-10-01","2024-10-07","en_US","SGD",2).then((result) => {
//     console.log(result.isFetchComplete);
//     console.log(result.hotelPricesList.length);
// });


export { HotelPrice, fetchHotelPricesByDestination };

