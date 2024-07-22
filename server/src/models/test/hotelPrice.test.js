import { HotelPrice, fetchHotelPricesByDestination } from '../hotelPrice';

describe("HotelPrice instance test", () => {
    test("can create HotelPrice instance with attributes", () => {
        const hotelPriceTest = new HotelPrice(
            "1", 
            1, 
            200.0, 
            [{ date: "2024-10-01", rate: 200.0 }]
        );

        expect(hotelPriceTest.id).toBe("1");
        expect(hotelPriceTest.searchRank).toBe(1);
        expect(hotelPriceTest.price).toBe(200.0);
        expect(hotelPriceTest.marketRates).toEqual([{ date: "2024-10-01", rate: 200.0 }]);
    });
});

describe("hotel prices API calls test", () => {
    test("can fetch hotel prices given valid parameters", async () => {
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

    test("successfully create list of HotelPrice objects from API call", async () => {
        const hotelPricesMap = await fetchHotelPricesByDestination(
            "WD0M", "2024-10-01", "2024-10-07", "en_US", "SGD", "2"
        );
        // Convert map values to array
        const hotelPriceList = Array.from(hotelPricesMap.values());
        // check if every item in hotelPriceList is an instance of HotelPrice class
        expect(Array.isArray(hotelPriceList)).toBe(true);
        expect(hotelPriceList.every(hotelPrice => hotelPrice instanceof HotelPrice)).toEqual(true);
    });
});
