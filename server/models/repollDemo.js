// DEMO of proposal in `RyanNotes.md`

import { HotelPrice, fetchHotelPricesByDestination } from "./hotelPrice.js";

async function pollHotelPricesByDestination(destination_id, checkin, checkout, lang, currency, guests) {
    const hotelPricesList = []; // store all HotelPrice instances
    var isFetchComplete = false;
    var poll_idx = 0;
    var pollCount = 0;

    // Poll API until completed=true
    while(!isFetchComplete) {
        pollCount += 1;

        let result = await fetchHotelPricesByDestination(destination_id, checkin, checkout, lang, currency, guests, poll_idx=poll_idx);
        hotelPricesList.push(...result.hotelPricesList);
        poll_idx = result.hotelPricesList.length;
        isFetchComplete = result.isFetchComplete;
        if (!isFetchComplete) { // prepare to repoll
            await new Promise(resolve => setTimeout(resolve, 2000)); // wait 2 seconds
        }
    }

    return {
        hotelPricesList: hotelPricesList,
        pollCount: pollCount
    };
}

pollHotelPricesByDestination("WD0M","2024-10-01","2024-10-07","en_US","SGD",2).then((result) => {
    console.log("Hotel count:", result.hotelPricesList.length);
    console.log("Poll count:", result.pollCount);
});