import { Hotel } from '../hotel';
import { fetchHotel } from '../hotel';
import { fetchHotelsByDestination } from '../hotel';


describe("hotel constructor test", () =>{
    test("successfully create list of Hotel objects from api call", async () => {
        const hotelList = await fetchHotelsByDestination('RsBU');
        // check if every item in hotelList is an instance of Hotel class
        expect(hotelList.every(hotel => hotel instanceof Hotel)).toEqual(true);
    })
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

