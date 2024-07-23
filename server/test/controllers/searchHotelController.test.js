import request from 'supertest';
import express from 'express';
import { json } from 'body-parser';
import { searchHotelById } from '../../src/controllers/searchHotelController';
import { fetchRoomPrices, Room } from '../../src/models/room';
import { fetchHotel, Hotel } from '../../src/models/hotel';

// 1. Setup and Configuration
const app = express();
// tells the Express application to use the json middleware.
// makes the parsed data available on req.body
app.use(json());
app.post('/search/:id', searchHotelById);

// 2.Mock Implementation
jest.mock('../../src/models/room' , () => ({
    fetchRoomPrices: jest.fn(), // Jest will create a mock function but without any actual logic.
    // Jest will create a mock class with the same methods but without any actual logic so for this case need to 
    // explicitly define or pass a mock Room instance as the mock response
    Room: class{
        constructor(id, key, roomNormalizedDescription, free_cancellation, roomDescription, long_description, images, amenities, price, market_rates) {
            // parameter names follow JSON response attribute names
            this.hotelId = id; // Hotel ID (not part of response object)
            this.key = key;
            this.roomNormalizedDescription = roomNormalizedDescription;
            this.freeCancellation = free_cancellation;
            this.roomDescription = roomDescription; // Following handout but is this really necessary? (if we already have normalized description)
            this.longRoomDescription = long_description;
            this.images = images;
            this.amenities = amenities;
            this.price = price;
            this.marketRates = market_rates;
        }
    }
}));
jest.mock('../../src/models/hotel', () => ({
    fetchHotel: jest.fn(), // just making a mock function for fetchHotel() does not actually mean anything
    Hotel: class { 
        constructor(id, name, latitude, longitude, address, rating, categories, description, amenities, image_details) {
            this.id = id;
            this.name = name;
            this.latitude = latitude;
            this.longitude = longitude;
            this.address = address;
            this.rating = rating;
            this.categories = categories;
            this.description = description;
            this.amenities = amenities;
            this.imageDetails = image_details;
        }
    }
}));

// 3. Test cases
describe('searchHotelController test suite', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('searchHotelById() should return filtered list of hotels', async () => {
        // It basically just means 'i dont care what this function does just know that mockHotel will be the response'
        fetchHotel.mockResolvedValue(mockHotel);
        fetchRoomPrices.mockResolvedValue(mockRoomPricesArray);

        const response = await request(app)
            .post('/search/1')
            .send({
                destination_id: 'WD0M',
                checkin: '2024-08-01',
                checkout: '2024-08-10',
                lang: 'en',
                currency: 'USD',
                guests: 2
            });

        expect(response.status).toBe(200);
        console.log(response.body);
        expect(response.body).toEqual({
            hotel: mockHotel,
            rooms: mockRoomPricesArray
        });
        expect(fetchHotel).toHaveBeenCalledWith('1');
        expect(fetchRoomPrices).toHaveBeenCalledWith('1', 'WD0M', '2024-08-01', '2024-08-10', 'en', 'USD', 2);
    });

});


// 4. Mock data
const mockHotel = 
            new Hotel(
                '1',
                'Hotel One',
                '123.45',
                '678.90',
                'Address One',
                '4.5',
                ['family', 'leisure'],
                'Description One',
                'Pool',
                [{url:'image1.jpg'}]
            );

const mockRoomPricesArray = [
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