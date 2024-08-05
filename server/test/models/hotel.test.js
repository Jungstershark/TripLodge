import axios from 'axios';
import { Hotel, fetchHotelsByDestination, fetchHotel } from '../../src/models/hotel.js';
import { ascendaAPI } from '../../src/models/ascendaApi.js';

// Mock axios
jest.mock('axios');

// Mock data
const mockHotelData = {
    id: '1',
    name: 'Test Hotel',
    latitude: 1.2345,
    longitude: 6.7890,
    address: '123 Test St',
    rating: 4.5,
    categories: ['Luxury'],
    description: 'A test hotel',
    amenities: ['WiFi', 'Pool'],
    image_details: { url: 'http://test.com/image.jpg' }
};

const mockHotelsData = [mockHotelData, {...mockHotelData, id: '2', name: 'Test Hotel 2'}];

describe('Hotel Model test', () => {
    let consoleErrorSpy;

    beforeEach(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(); // Spying on console.error function call
    });

    afterEach(() => {
        jest.clearAllMocks();
        consoleErrorSpy.mockRestore();
    });

    describe('Hotel class', () => {
        test('should create a Hotel instance correctly', () => {
            const hotel = new Hotel(
                mockHotelData.id,
                mockHotelData.name,
                mockHotelData.latitude,
                mockHotelData.longitude,
                mockHotelData.address,
                mockHotelData.rating,
                mockHotelData.categories,
                mockHotelData.description,
                mockHotelData.amenities,
                mockHotelData.image_details
            );

            expect(hotel).toBeInstanceOf(Hotel);
            expect(hotel.id).toBe(mockHotelData.id);
            expect(hotel.name).toBe(mockHotelData.name);
            expect(hotel.latitude).toBe(mockHotelData.latitude);
            expect(hotel.longitude).toBe(mockHotelData.longitude);
            expect(hotel.address).toBe(mockHotelData.address);
            expect(hotel.rating).toBe(mockHotelData.rating);
            expect(hotel.categories).toEqual(mockHotelData.categories);
            expect(hotel.description).toBe(mockHotelData.description);
            expect(hotel.amenities).toEqual(mockHotelData.amenities);
            expect(hotel.imageDetails).toEqual(mockHotelData.image_details);
        });
    });

    describe('fetchHotelsByDestination', () => {
        test('should fetch hotels and return a Map of Hotel instances', async () => {
            axios.get.mockResolvedValue({ data: mockHotelsData });

            const result = await fetchHotelsByDestination('destination1');

            expect(axios.get).toHaveBeenCalledWith(
                ascendaAPI.getHotelsByDestination,
                { params: { destination_id: 'destination1' } }
            );
            expect(result).toBeInstanceOf(Map);
            expect(result.size).toBe(2);
            expect(result.get('1')).toBeInstanceOf(Hotel);
            expect(result.get('1').name).toBe('Test Hotel');
            expect(result.get('2').name).toBe('Test Hotel 2');
        });

        test('should throw an error and log it if the request fails', async () => {
            const error = new Error('Network error');
            axios.get.mockRejectedValue(error);

            await expect(fetchHotelsByDestination('destination1')).rejects.toThrow('Network error');
            expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching hotels by destination:', error);
        });
    });

    describe('fetchHotel', () => {
        test('should fetch a single hotel and return a Hotel instance', async () => {
            axios.get.mockResolvedValue({ data: mockHotelData });

            const id = mockHotelData.id
            const result = await fetchHotel(id);

            expect(axios.get).toHaveBeenCalledWith(ascendaAPI.getHotel(id));
            expect(result).toBeInstanceOf(Hotel);
            expect(result.id).toBe(id);
            expect(result.name).toBe(mockHotelData.name);
            expect(result.latitude).toBe(mockHotelData.latitude);
            expect(result.longitude).toBe(mockHotelData.longitude);
            expect(result.address).toBe(mockHotelData.address);
            expect(result.rating).toBe(mockHotelData.rating);
            expect(result.categories).toEqual(mockHotelData.categories);
            expect(result.description).toBe(mockHotelData.description);
            expect(result.amenities).toEqual(mockHotelData.amenities);
            expect(result.imageDetails).toEqual(mockHotelData.image_details);
        });

        test('should throw an error and log it if the request fails', async () => {
            const error = new Error('Network error');
            axios.get.mockRejectedValue(error);

            await expect(fetchHotel('1')).rejects.toThrow('Network error');
            expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching hotel by ID:', error);
        });
    });
});