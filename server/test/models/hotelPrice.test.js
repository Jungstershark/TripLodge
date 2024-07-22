import { HotelPrice, fetchHotelPricesByDestination } from '../hotelPrice';

describe("fetchHotelPricesByDestination", () => {
    test("can fetch hotel prices given valid parameters", async () => {
        // Adjust parameters based on the API's requirements and expected results
        const hotelPrices = await fetchHotelPricesByDestination(
            "WD0M", "2024-10-01", "2024-10-07", "en_US", "SGD", "2"
        );

        // Verify that the Map is populated as expected
        expect(hotelPrices instanceof Map).toBe(true);
        expect(hotelPrices.size).toBeGreaterThan(0); // Ensure there's at least one hotel price

        const firstHotel = Array.from(hotelPrices.values())[0];
        expect(firstHotel).toBeInstanceOf(HotelPrice);
        expect(firstHotel.id).toBeDefined();
        expect(firstHotel.searchRank).toBeDefined();
        expect(firstHotel.price).toBeDefined();
        expect(firstHotel.marketRates).toBeDefined();
    });

    test("throws an error if API poll limit is exceeded", async () => {
        // Using parameters that will cause the poll limit to be exceeded quickly
        await expect(fetchHotelPricesByDestination(
            "WD0M", "2024-10-01", "2024-10-07", "en_US", "SGD", "2", 0, 1
        )).rejects.toThrow("Exceeded API poll limit.");
    });
});
