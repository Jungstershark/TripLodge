import axios from 'axios';
import { HotelPrice, fetchHotelPricesByDestination } from '../../src/models/hotelPrice.js';
import { ascendaAPI } from '../../src/models/ascendaApi.js';

// Mock axios
jest.mock('axios');

// Mock data
const mockPriceData = {
    id: 'T9cE',
    searchRank: 1,
    price_type: "multi",
    max_cash_payment: 965.68,
    converted_max_cash_payment: 1301.12,
    points: 32525,
    bonuses: 0,
    bonus_programs: [],
    bonus_tiers: [],
    lowest_price: 965.68,
    price: 1301.12,
    converted_price: 1301.12,
    lowest_converted_price: 1301.12,
    market_rates: [{"supplier":"expedia","rate":1118.123406054}]
}

const mockHotelPricesData = [mockPriceData, {...mockPriceData, id: 'obxM'}];

describe('HotelPrice Model test', () => {
    let consoleErrorSpy;

    beforeEach(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(); // Spying on console.error function call
    });

    afterEach(() => {
        jest.clearAllMocks();
        consoleErrorSpy.mockRestore();
    });

    describe('HotelPrice class', () => {
        test('should create a HotelPrice instance correctly', () => {
            const hotelPrice = new HotelPrice(
                mockPriceData.id,
                mockPriceData.searchRank,
                mockPriceData.price,
                mockPriceData.market_rates
            );

            expect(hotelPrice).toBeInstanceOf(HotelPrice);
            expect(hotelPrice.id).toBe(mockPriceData.id);
            expect(hotelPrice.searchRank).toBe(mockPriceData.searchRank);
            expect(hotelPrice.price).toBe(mockPriceData.price);
            expect(hotelPrice.marketRates).toEqual(mockPriceData.market_rates);
        });
    });

    describe('fetchHotelPricesByDestination', () => {
        test('should fetch hotel prices by destination and return a Map of HotelPrice instances', async () => {
            axios.get.mockResolvedValue({data: {
                searchCompleted: null,
                completed: true,
                status: null,
                currency: "SGD",
                hotels: mockHotelPricesData
            }});

            const result = await fetchHotelPricesByDestination('destination1', '2024-08-01', '2024-08-05', 'en', 'USD', 2);

            expect(axios.get).toHaveBeenCalledWith(
                ascendaAPI.getHotelPricesByDestination,
                { params: {
                    destination_id: 'destination1',
                    checkin: '2024-08-01',
                    checkout: '2024-08-05',
                    lang: 'en',
                    currency: 'USD',
                    guests: 2,
                    partner_id: 1
                } }
            );
            expect(result).toBeInstanceOf(Map);
            expect(result.size).toBe(2);
            
            // First hotelPrice object
            const hotelPriceZero = result.get(mockHotelPricesData[0].id);
            expect(hotelPriceZero).toBeInstanceOf(HotelPrice);
            expect(hotelPriceZero.id).toBe(mockHotelPricesData[0].id);
            expect(hotelPriceZero.searchRank).toBe(mockHotelPricesData[0].searchRank);
            expect(hotelPriceZero.price).toBe(mockHotelPricesData[0].price);
            expect(hotelPriceZero.marketRates).toEqual(mockHotelPricesData[0].market_rates);

            // Second hotelPrice object
            const hotelPriceOne = result.get(mockHotelPricesData[1].id);
            expect(hotelPriceOne).toBeInstanceOf(HotelPrice);
            expect(hotelPriceOne.id).toBe(mockHotelPricesData[1].id);
            expect(hotelPriceOne.searchRank).toBe(mockHotelPricesData[1].searchRank);
            expect(hotelPriceOne.price).toBe(mockHotelPricesData[1].price);
            expect(hotelPriceOne.marketRates).toEqual(mockHotelPricesData[1].market_rates);

        });

        test('should throw an error and log it if the request fails', async () => {
            const error = new Error('Network error');
            axios.get.mockRejectedValue(error);

            await expect(fetchHotelPricesByDestination('destination1', '2024-08-01', '2024-08-05', 'en', 'USD', 2)).rejects.toThrow('Network error');
            expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching hotel prices by destination:', error);
        });

        test('should throw an error if API poll count exceeded', async () => {
            axios.get.mockResolvedValue({data: {
                searchCompleted: null,
                completed: false, // ascendas API poll never completes
                status: null,
                currency: "SGD",
                hotels: mockHotelPricesData
            }});
            
            await expect(fetchHotelPricesByDestination('destination1', '2024-08-01', '2024-08-05', 'en', 'USD', 2)).rejects.toThrow('Exceeded API poll limit.');
        });
    });

});