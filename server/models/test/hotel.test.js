import { Hotel } from '../hotel';
import { fetchHotel } from '../hotel';
import { fetchHotelsByDestination } from '../hotel';

describe("hotel test-suite", () =>{
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

        expect(hotelTest.id).toBe(1)
        expect(hotelTest.name).toBe("Bling Bling Hotel")
        expect(hotelTest.latitude).toBe("123")
        expect(hotelTest.longtitude).toBe("456")
        expect(hotelTest.address).toBe("7 North Rd")
        expect(hotelTest.rating).toBe("5.0")
        expect(hotelTest.categories).toEqual(["family", "leisure"])
        expect(hotelTest.description).toBe("This is a very nice hotel")
        expect(hotelTest.amenities).toBe("playground")
        expect(hotelTest.imageDetails).toBe("no image")
    })
    // parameters are not assigned a data type hence whatever data type 
    // is used to instatiate the Hotel object will be the data type of 
    // that attribute -> not what we want
})

describe("hotel api calls test", ()=>{
    test("can fetch hotel given hotel id", async ()=>{
        const hotel = await fetchHotel('diH7');
        expect(hotel.name).toBe('The Fullerton Hotel Singapore');
    })

    test("can fetch hotel by destination given destination id", async()=>{
        const hotelByDestination = await fetchHotelsByDestination('RsBU');
        expect(hotelByDestination.length).toEqual(660);
    })
})

