import axios from 'axios';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("hotel prices API calls test", () => {
    test("can fetch hotel prices given destination id and other parameters", async () => {
        const mockResponse = {
            data: {
                completed: true,
                hotels: [
                    {
                        id: "hotel_123",
                        searchRank: 1,
                        price: 200.00,
                        market_rates: { rateType: "member", rateValue: 180.00 }
                    }
                ]
            }
        };
        mockedAxios.get.mockResolvedValueOnce(mockResponse);

        const hotelPrices = await fetchHotelPricesByDestination(
            "WD0M", "2024-10-01", "2024-10-07", "en_US", "SGD", "2"
        );

        console.log("hotelPrices:", hotelPrices);

        expect(mockedAxios.get).toHaveBeenCalledWith(expect.any(String), {
            params: {
                destination_id: "WD0M",
                checkin: "2024-10-01",
                checkout: "2024-10-07",
                lang: "en_US",
                currency: "SGD",
                guests: "2",
                partner_id: 1
            }
        });

        expect(hotelPrices.length).toBe(1);
        expect(hotelPrices[0].id).toBe("hotel_123");
        expect(hotelPrices[0].searchRank).toBe(1);
        expect(hotelPrices[0].price).toBe(200.00);
        expect(hotelPrices[0].marketRates).toEqual({ rateType: "member", rateValue: 180.00 });
    });

    test("throws an error if API poll limit is exceeded", async () => {
        const mockResponse = {
            data: {
                completed: false
            }
        };
        mockedAxios.get.mockResolvedValueOnce(mockResponse).mockResolvedValueOnce(mockResponse);

        await expect(fetchHotelPricesByDestination(
            "WD0M", "2024-10-01", "2024-10-07", "en_US", "SGD", "2", 100, 2
        )).rejects.toThrow("Exceeded API poll limit.");

        expect(mockedAxios.get).toHaveBeenCalledTimes(2);
    });
});
