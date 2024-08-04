import request from 'supertest';
import express from 'express';
import searchRouter from '../../src/routes/search.js';  
//import { jest } from '@jest/globals';

// Setup the Express app
const app = express();
app.use(express.json());
app.use('/search', searchRouter);

// Mock the model's API calling functions
jest.mock('../../src/models/hotel.js', () => {
    const actualModule = jest.requireActual('../../src/models/hotel.js');
    return {
        ...actualModule,
        fetchHotelsByDestination: jest.fn(),
        fetchHotel: jest.fn(),
        Hotel: actualModule.Hotel // Use the actual Hotel class
    };
});
jest.mock('../../src/models/hotelPrice.js', () => {
    const actualModule = jest.requireActual('../../src/models/hotelPrice.js');
    return {
        ...actualModule,
        fetchHotelPricesByDestination: jest.fn(),
        HotelPrice: actualModule.HotelPrice // Use the actual HotelPrice class
    };
});
jest.mock('../../src/models/room.js', () => {
    const actualModule = jest.requireActual('../../src/models/room.js');
    return {
        ...actualModule,
        fetchRoomPrices: jest.fn(),
        Room: actualModule.Room  // Use the actual Room class
    };
});

import { Hotel, fetchHotelsByDestination, fetchHotel } from '../../src/models/hotel.js';
import { HotelPrice, fetchHotelPricesByDestination } from '../../src/models/hotelPrice.js';
import { Room, fetchRoomPrices } from '../../src/models/room.js';

// Test cases
describe("Hotel Search API Integration Tests", () => {
    beforeEach(() => {
        // Clear all mock implementations before each test
        jest.clearAllMocks();
    });

    test("POST /search/destination/:id should return list of hotels for a given destination", async () => {
        const mockHotelsMap = new Map([
            [mockHotelOne.id, mockHotelOne],
            [mockHotelTwo.id, mockHotelTwo],
        ]);
        const mockHotelPricesMap = new Map([
            [mockHotelPriceOne.id, mockHotelPriceOne],
            [mockHotelPriceTwo.id, mockHotelPriceTwo],
        ]);

        fetchHotelsByDestination.mockResolvedValue(mockHotelsMap);
        fetchHotelPricesByDestination.mockResolvedValue(mockHotelPricesMap);

        const res = await request(app)
            .post('/search/destination/123')
            .send({
                checkin: '2024-08-01',
                checkout: '2024-08-05',
                lang: 'en',
                currency: 'USD',
                guests: 2
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([
            { hotel: mockHotelOne, price: mockHotelPriceOne.price },
            { hotel: mockHotelTwo, price: mockHotelPriceTwo.price },
        ]);
        expect(fetchHotelsByDestination).toHaveBeenCalledWith('123');
        expect(fetchHotelPricesByDestination).toHaveBeenCalledWith('123', '2024-08-01', '2024-08-05', 'en', 'USD', 2);
    });

    test("POST /search/hotel/:id should return hotel details with room information", async () => {
        fetchHotel.mockResolvedValue(mockHotelOne);
        fetchRoomPrices.mockResolvedValue(mockRooms);

        const res = await request(app)
            .post('/search/hotel/1')
            .send({
                destination_id: '123',
                checkin: '2024-08-01',
                checkout: '2024-08-05',
                lang: 'en',
                currency: 'USD',
                guests: 2
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            hotel: mockHotelOne,
            rooms: mockRooms,
        });
        expect(fetchHotel).toHaveBeenCalledWith('1');
        expect(fetchRoomPrices).toHaveBeenCalledWith('1', '123', '2024-08-01', '2024-08-05', 'en', 'USD', 2);
    });
});


// Mock data
const mockHotelOne = new Hotel(
    '1',
    'Hotel One',
    '100.00',
    '100.00',
    'Address One',
    '1.0',
    {
        "overall": {"name":"Overall","score":94,"popularity":4.0},
        "romantic_hotel":{"name":"Romantic Hotel","score":72,"popularity":8.615484615384615},
        "family_hotel":{"name":"Family Hotel","score":75,"popularity":11.26431404682274},
        "business_hotel":{"name":"Business Hotel","score":85,"popularity":23.84625384615385}
    },
    'Description One',
    {"airConditioning":true,"clothingIron":true,"continentalBreakfast":true,"dataPorts":true,"hairDryer":true,"kitchen":true,"outdoorPool":true,"parkingGarage":true,"safe":true,"tVInRoom":true,"voiceMail":true},
    {"suffix":".jpg","count":10,"prefix":"https://d2ey9sqrvkqdfs.cloudfront.net/100A/"}
);

const mockHotelTwo = new Hotel(
    '2',
    'Hotel Two',
    '200.00',
    '200.00',
    'Address Two',
    '2.0',
    {
        "overall": {"name":"Overall","score":94,"popularity":4.0},
        "romantic_hotel":{"name":"Romantic Hotel","score":72,"popularity":8.615484615384615},
        "family_hotel":{"name":"Family Hotel","score":75,"popularity":11.26431404682274},
        "business_hotel":{"name":"Business Hotel","score":85,"popularity":23.84625384615385}
    },
    'Description One',
    {"airConditioning":true,"clothingIron":true,"continentalBreakfast":true,"dataPorts":true,"hairDryer":true,"kitchen":true,"outdoorPool":true,"parkingGarage":true,"safe":true,"tVInRoom":true,"voiceMail":true},
    {"suffix":".jpg","count":20,"prefix":"https://d2ey9sqrvkqdfs.cloudfront.net/200B/"}
);

const mockHotelPriceOne = new HotelPrice(
    '1',
    0.95,
    1000.00,
    [{"supplier":"expedia","rate":1123.3367359488}]
);

const mockHotelPriceTwo = new HotelPrice(
    '2',
    0.95,
    2000.00,
    [{"supplier":"expedia","rate":1123.3367359488}]
);

const mockRooms = [
    new Room(
        1,
        5,
        "This room is great!",
        true,
        "This room has great WiFi, great shower and comfy bed.",
        "I am a longer description hehehe, peepeepoopoo nei hou mou.",
        [{url:"https://thumbs.dreamstime.com/b/hotel-rooms-8146308.jpg"}],
        ["Gym", "Free Parking", "Free Wi-Fi", "Dry Cleaning", "Washing Machine"],
        500.00,
        550.00),
    new Room(
        1,
        7,
        "This room is awesome!",
        false,
        "This room has great scenery.",
        "I am a longer description hehehe.",
        [{url:"https://example.jpg"}],
        ["Gym", "Free Wi-Fi", "Dry Cleaning", "Washing Machine"],
        400.00,
        500.00)
];