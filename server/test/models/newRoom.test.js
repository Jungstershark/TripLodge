import axios from 'axios';
import { Room, fetchRoomPrices } from '../../src/models/room.js';
import { ascendaAPI } from '../../src/models/ascendaApi.js';

// Mock axios
jest.mock('axios');

// Mock data
const mockRoomData = {
    key: 'room1',
    roomNormalizedDescription: 'Standard Room',
    free_cancellation: true,
    roomDescription: 'Cozy Standard Room',
    long_description: 'A comfortable standard room with all amenities',
    images: ['image1.jpg', 'image2.jpg'],
    amenities: ['WiFi', 'TV'],
    price: 100,
    market_rates: { base: 120, tax: 20 }
};
  
const mockApiResponse = {
    completed: true,
    rooms: [mockRoomData, {...mockRoomData, key: 'room2', roomNormalizedDescription: 'Deluxe Room'}]
};

describe('Room Model', () => {
    let consoleErrorSpy;
    let consoleLogSpy;

    beforeEach(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
        consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    });

    afterEach(() => {
        jest.clearAllMocks();
        consoleErrorSpy.mockRestore();
        consoleLogSpy.mockRestore();
    });

    describe('Room class', () => {
        test('should create a Room instance correctly', () => {
            const room = new Room(
                'hotel1',
                mockRoomData.key,
                mockRoomData.roomNormalizedDescription,
                mockRoomData.free_cancellation,
                mockRoomData.roomDescription,
                mockRoomData.long_description,
                mockRoomData.images,
                mockRoomData.amenities,
                mockRoomData.price,
                mockRoomData.market_rates
            );

            expect(room).toBeInstanceOf(Room);
            expect(room.hotelId).toBe('hotel1');
            expect(room.key).toBe(mockRoomData.key);
            expect(room.roomNormalizedDescription).toBe(mockRoomData.roomNormalizedDescription);
            expect(room.freeCancellation).toBe(mockRoomData.free_cancellation);
            expect(room.roomDescription).toBe(mockRoomData.roomDescription);
            expect(room.longRoomDescription).toBe(mockRoomData.long_description);
            expect(room.images).toEqual(mockRoomData.images);
            expect(room.amenities).toEqual(mockRoomData.amenities);
            expect(room.price).toBe(mockRoomData.price);
            expect(room.marketRates).toEqual(mockRoomData.market_rates);
        });
    });

    describe('fetchRoomPrices', () => {
        test('should fetch room prices and return an array of Room instances', async () => {
            axios.get.mockResolvedValue({ data: mockApiResponse });

            const result = await fetchRoomPrices('hotel1', 'dest1', '2023-06-01', '2023-06-05', 'en', 'USD', '2');

            expect(axios.get).toHaveBeenCalledWith(
                ascendaAPI.getHotelPrice('hotel1'),
                {
                params: {
                    destination_id: 'dest1',
                    checkin: '2023-06-01',
                    checkout: '2023-06-05',
                    lang: 'en',
                    currency: 'USD',
                    guests: '2',
                    partner_id: 1
                }
                }
            );
            expect(result).toHaveLength(2);

            expect(result[0]).toBeInstanceOf(Room);
            expect(result[0].key).toBe('room1');
            expect(result[0].roomNormalizedDescription).toBe('Standard Room');

            expect(result[1]).toBeInstanceOf(Room);
            expect(result[1].key).toBe('room2');
            expect(result[1].roomNormalizedDescription).toBe('Deluxe Room');

            expect(consoleLogSpy).toHaveBeenCalledWith('API polled 1 time(s)');
        });

        test('should poll API multiple times if API returns not completed', async () => {
            const incompleteResponse = { data: { completed: false } };
            const completeResponse = { data: { ...mockApiResponse, completed: true } };
            
            axios.get
                .mockResolvedValueOnce(incompleteResponse)
                .mockResolvedValueOnce(incompleteResponse)
                .mockResolvedValueOnce(completeResponse);

            const result = await fetchRoomPrices('hotel1', 'dest1', '2023-06-01', '2023-06-05', 'en', 'USD', '2');
            expect(result).toHaveLength(2);

            // Check poll count
            expect(axios.get).toHaveBeenCalledTimes(3);
            expect(consoleLogSpy).toHaveBeenCalledWith('API polled 3 time(s)');
        }); 

        test('handles "Exceeded API poll limit." error', async () => {
            axios.get.mockResolvedValue({data: {
                searchCompleted: null,
                completed: false, // ascendas API poll never completes
                status: null,
                currency: "SGD",
                rooms: mockApiResponse.rooms
            }});
            
            const result = await fetchRoomPrices('destination1', '2024-08-01', '2024-08-05', 'en', 'USD', 2);

            // Check if error message was logged
            expect(consoleLogSpy).toHaveBeenCalledWith("Exceeded API poll limit.");

            // Should return empty array
            expect(result).toEqual([]);
        });

        test('handles Ascendas API 422 status (unprocessable inputs)', async () => {
            axios.get.mockRejectedValue({
                response: {
                  status: 422,
                  data: 'Unprocessable Entity'
                }
              });
            
            const result = await fetchRoomPrices('destination1', '2024-08-01', '2024-08-05', 'en', 'USD', 2);

            // Should return empty array
            expect(result).toEqual([]);
        });

        test('should throw an error if the request fails', async () => {
            const error = new Error('Network error');
            axios.get.mockRejectedValue(error);

            await expect(fetchRoomPrices('hotel1', 'dest1', '2023-06-01', '2023-06-05', 'en', 'USD', '2'))
                .rejects.toThrow('Network error');
            
            expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching room prices of given hotel:', error);
        });
    });
});