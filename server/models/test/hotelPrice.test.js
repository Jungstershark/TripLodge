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
        // Simulate a scenario where the API would exceed the poll limit
        // This might require setting up a mock server or using a staging environment

        await expect(fetchHotelPricesByDestination(
            "WD0M", "2024-10-01", "2024-10-07", "en_US", "SGD", "2", 500, 1 // Quick poll limit
        )).rejects.toThrow("Exceeded API poll limit.");
    });
});
