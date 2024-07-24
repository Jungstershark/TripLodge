import axios from "axios";
import { fetchHotelPricesByDestination } from "../../src/models/hotelPrice";

describe("hotelPrice error handling", ()=>{
    test("fetchHotelPricesByDestination able to handle errors", async()=>{
        jest.spyOn(axios, 'get').mockRejectedValue(new Error('Network Error'));
    
        try {
            await fetchHotelPricesByDestination("WD0M", "2024-10-01", "2024-10-07", "en_US", "SGD", "2");
        } catch (error) {
            expect(error.message).toBe('Network Error');
        }
    
        // Restore the mock
        jest.restoreAllMocks();
    });
});
