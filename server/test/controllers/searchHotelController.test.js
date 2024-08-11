import request from 'supertest';
import express from 'express';
import searchRouter from '../../src/routes/search.js';  

import axios from 'axios'; // Hotel model uses ascenda API
import { ascendaAPI } from '../../src/models/ascendaApi.js';

import { Hotel } from '../../src/models/hotel.js';
import { HotelPrice } from '../../src/models/hotelPrice.js';
import { Room } from '../../src/models/room.js';

// Setup the Express app
const app = express();
app.use(express.json());
app.use('/search', searchRouter);

// Mock axios
jest.mock('axios');

describe("Hotel Search API Integration Tests", () => {
    beforeEach(() => {
        // Clear all mock implementations before each test
        jest.clearAllMocks();
    });

    describe("POST /search/destination/:id", () => {
        test("should return list of hotels for a given destination", async () => {
        
            // Mock data returned depends on requested endpoint
            axios.get.mockImplementation((endpoint, params) => {
                if (endpoint === ascendaAPI.getHotelsByDestination) {
                    // getting hotel info by destination
                    return Promise.resolve({ data: [mockHotelData] }); // only one hotel in list
                }
                // else: get hotelPrice by destination
                return Promise.resolve({data: {
                    searchCompleted: null,
                    completed: true,
                    status: null,
                    currency: "SGD",
                    hotels: [mockPriceData]
                }});
            });
    
            const res = await request(app)
                .post(`/search/destination/w0Xm`)
                .send({
                    checkin: '2024-08-01',
                    checkout: '2024-08-05',
                    lang: 'en',
                    currency: 'USD',
                    guests: 2
                });
    
            expect(res.statusCode).toBe(200);
            expect(res.body.length).toBe(1); // only one hotel fetched
            expect(res.body).toEqual([
                { hotel: mockHotel, price: mockHotelPrice.price },
            ]); 
        });

        test("should handle empty hotel list data from API", async () => {
            axios.get.mockImplementation((endpoint, params) => {
                if (endpoint === ascendaAPI.getHotelsByDestination) {
                    // getting hotel info by destination
                    return Promise.resolve({ data: [] }); // empty
                }
                // else: get hotelPrice by destination
                return Promise.resolve({data: {
                    searchCompleted: null,
                    completed: true,
                    status: null,
                    currency: "SGD",
                    hotels: [] // empty
                }});
            });
    
            const res = await request(app)
                .post(`/search/destination/w0Xm`)
                .send({
                    checkin: '2024-08-01',
                    checkout: '2024-08-05',
                    lang: 'en',
                    currency: 'USD',
                    guests: 2
                });
    
            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual([]);
        });

    });

    describe("POST /search/hotel/:id", () => {
        test("should return hotel details with room information", async () => {

            // Mock data returned depends on requested endpoint
            axios.get.mockImplementation((endpoint, params) => {
                if (endpoint === ascendaAPI.getHotel(mockHotelData.id)) {
                    // getting hotel info by id
                    return Promise.resolve({ data: mockHotelData }); 
                }
                // else: get room by hotel id;
                return Promise.resolve({data: {
                    searchCompleted: null,
                    completed: true,
                    status: null,
                    currency: "SGD",
                    rooms: [mockRoomData] // just one room in the list
                }});
            });
    
            const res = await request(app)
                .post(`/search/hotel/${mockHotelData.id}`)
                .send({
                    destination_id: 'w0Xm',
                    checkin: '2024-08-01',
                    checkout: '2024-08-05',
                    lang: 'en',
                    currency: 'USD',
                    guests: 2
                });
    
            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual({
                hotel: mockHotel,
                rooms: [mockRoom], // just one room
            });
        });

        test("should handle hotel not found", async () => {
            // Mock data returned depends on requested endpoint
            axios.get.mockImplementation((endpoint, params) => {
                if (endpoint === ascendaAPI.getHotel(mockHotelData.id)) {
                    // getting hotel info by id
                    return Promise.resolve({ data: {} }); 
                }
                // else: get room by hotel id;
                return Promise.resolve({data: {
                    searchCompleted: null,
                    completed: true,
                    status: null,
                    currency: "SGD",
                    rooms: [] // just one room in the list
                }});
            });
    
            const res = await request(app)
                .post(`/search/hotel/nonexistent`)
                .send({
                    destination_id: 'w0Xm',
                    checkin: '2024-08-01',
                    checkout: '2024-08-05',
                    lang: 'en',
                    currency: 'USD',
                    guests: 2
                });
    
            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual({
                hotel: {},
                rooms: [], 
            });
        });

    });

    test("Endpoints should handle Ascenda API 422 errors (return empty data rather than crash)", async () => {
        jest.clearAllMocks();
        axios.get.mockRejectedValue({
            response: {
              status: 422,
              data: 'Unprocessable Entity'
            }
          });

        const res1 = await request(app)
            .post(`/search/destination/w0Xm`)
            .send({
                checkin: '2024-08-01',
                checkout: '2024-08-05',
                lang: 'en',
                currency: 'USD',
                guests: 2
            });

        const res2 = await request(app)
            .post(`/search/hotel/${mockHotelData.id}`)
            .send({
                destination_id: 'w0Xm',
                checkin: '2024-08-01',
                checkout: '2024-08-05',
                lang: 'en',
                currency: 'USD',
                guests: 2
            });

        // Does not crash
        expect(res1.statusCode).toBe(200);
        expect(res2.statusCode).toBe(200);
    });
});

// Mock data
const mockHotelData = {
    id: '123',
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

const mockHotel = new Hotel(
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

const mockPriceData = {
    id: mockHotelData.id,
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

const mockHotelPrice = new HotelPrice(
    mockPriceData.id,
    mockPriceData.searchRank,
    mockPriceData.price,
    mockPriceData.market_rates
);

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

const mockRoom = new Room(
    mockHotelData.id, // use the mockHotelData.id for hotel id of this room
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