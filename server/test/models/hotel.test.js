import { Hotel, fetchHotel, fetchHotelsByDestination } from '../../src/models/hotel.js';
import axios from 'axios';

jest.mock('axios')

describe("hotel instance test", () =>{
    test("can create Hotel instance with attributes", () => {
        const hotelTest = new Hotel(
            1, 
            "Bling Bling Hotel", 
            "123", 
            "456", 
            "7 North Rd", 
            "5.0", ["family","leisure"], 
            "This is a very nice hotel", 
            "playground", 
            "no image");

        expect(hotelTest.id).toBe(1);
        expect(hotelTest.name).toBe("Bling Bling Hotel");
        expect(hotelTest.latitude).toBe("123");
        expect(hotelTest.longitude).toBe("456");
        expect(hotelTest.address).toBe("7 North Rd");
        expect(hotelTest.rating).toBe("5.0");
        expect(hotelTest.categories).toEqual(["family", "leisure"]);
        expect(hotelTest.description).toBe("This is a very nice hotel");
        expect(hotelTest.amenities).toBe("playground");
        expect(hotelTest.imageDetails).toBe("no image");
    })
})


beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
    console.error.mockRestore();
});

describe('Hotel API Tests', () => {
    test('fetchHotelsByDestination should return a map of Hotel instances', async () => {
        // Mock the API response
        const mockResponse = {
            data: [
                {
                    id: '1',
                    name: 'Hotel One',
                    latitude: '123.45',
                    longitude: '678.90',
                    address: 'Address One',
                    rating: '4.5',
                    categories: ['family', 'leisure'],
                    description: 'Description One',
                    amenities: 'Pool',
                    image_details: 'image1.jpg'
                },
                {
                    id: '2',
                    name: 'Hotel Two',
                    latitude: '234.56',
                    longitude: '789.01',
                    address: 'Address Two',
                    rating: '4.0',
                    categories: ['business'],
                    description: 'Description Two',
                    amenities: 'Gym',
                    image_details: 'image2.jpg'
                }
            ]
        };
        axios.get.mockResolvedValue(mockResponse);

        const hotelsMap = await fetchHotelsByDestination('destination-id');
        
        // Assert
        expect(hotelsMap instanceof Map).toBe(true);
        expect(hotelsMap.size).toBe(2);
        expect(hotelsMap.get('1')).toBeInstanceOf(Hotel);
        expect(hotelsMap.get('2')).toBeInstanceOf(Hotel);
    });

    test('fetchHotel should return a Hotel instance', async () => {
        // Mock the API response
        const mockResponse = {
            data: {
                id: '1',
                name: 'Hotel One',
                latitude: '123.45',
                longitude: '678.90',
                address: 'Address One',
                rating: '4.5',
                categories: ['family', 'leisure'],
                description: 'Description One',
                amenities: 'Pool',
                image_details: 'image1.jpg'
            }
        };
        axios.get.mockResolvedValue(mockResponse);

        const hotel = await fetchHotel('1');

        expect(hotel).toBeInstanceOf(Hotel);
        expect(hotel.id).toBe('1');
        expect(hotel.name).toBe('Hotel One');
    });

    test('fetchHotelsByDestination handles errors', async () => {
        // Simulate network error
        axios.get.mockRejectedValue(new Error('Network Error'));
        await expect(fetchHotelsByDestination('WD0M')).rejects.toThrow('Network Error');
    });

    test('fetchHotel handles errors', async () => {
        // Simulate network error
        axios.get.mockRejectedValue(new Error('Network Error'));
        await expect(fetchHotel('diH7')).rejects.toThrow('Network Error');
    });
})