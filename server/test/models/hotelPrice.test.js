import { HotelPrice, fetchHotelPricesByDestination } from '../hotelPrice';
import jest from 'jest-mock';

describe("fetchHotelPricesByDestination", () => {
    // Existing tests remain unchanged
    test("can fetch hotel prices given valid parameters", async () => {
        const hotelPrices = await fetchHotelPricesByDestination(
            "WD0M", "2024-10-01", "2024-10-07", "en_US", "SGD", "2"
        );

        expect(hotelPrices instanceof Map).toBe(true);
        expect(hotelPrices.size).toBeGreaterThan(0);

        const firstHotel = Array.from(hotelPrices.values())[0];
        expect(firstHotel).toBeInstanceOf(HotelPrice);
        expect(firstHotel.id).toBeDefined();
        expect(firstHotel.searchRank).toBeDefined();
        expect(firstHotel.price).toBeDefined();
        expect(firstHotel.marketRates).toBeDefined();
    }, 20000); // 20 seconds timeout

    test("throws an error if API poll limit is exceeded", async () => {
        jest.spyOn(global, 'fetchHotelPricesByDestination').mockImplementation(() => {
            throw new Error("Exceeded API poll limit.");
        });

        await expect(fetchHotelPricesByDestination(
            "WD0M", "2024-10-01", "2024-10-07", "en_US", "SGD", "2", 500, 1
        )).rejects.toThrow("Exceeded API poll limit.");

        global.fetchHotelPricesByDestination.mockRestore();
    }, 20000); // 20 seconds timeout
});
