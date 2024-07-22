import { Hotel } from '../../src/models/hotel';
import { fetchHotel } from '../../src/models/hotel';
import { fetchHotelsByDestination } from '../../src/models/hotel';

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

describe("hotel api calls test", ()=>{
    test("can fetch hotel given hotel id", async ()=>{
        const hotel = await fetchHotel('diH7');
        expect(hotel.name).toBe('The Fullerton Hotel Singapore');
        // check if hotel.categories is a JSON object
        expect(typeof hotel.categories).toBe('object');
    })

    test("can fetch hotel by destination given destination id", async()=>{
        const hotelsMap = await fetchHotelsByDestination('RsBU');
        const hotelList = Array.from(hotelsMap.values());
        expect(hotelList.length).toEqual(660);
    })

    test("successfully create list of Hotel objects from api call", async () => {
        const hotelsMap = await fetchHotelsByDestination('RsBU');
        // Convert map values to array
        const hotelList = Array.from(hotelsMap.values());
        // check if every item in hotelList is an instance of Hotel class
        expect(Array.isArray(hotelList)).toBe(true);
        expect(hotelList.every(hotel => hotel instanceof Hotel)).toEqual(true);
    })
})

