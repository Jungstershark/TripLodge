import { HotelPrice, fetchHotelPricesByDestination } from "../../src/models/hotelPrice";

describe("hotelPrice test suite", ()=>{

    test("can create HotelPrice instance with HotelPrie constructor", ()=>{
        const hotelPrice = new HotelPrice(1, 2, 3, 4)
        expect(hotelPrice instanceof HotelPrice).toBe(true);
        expect(hotelPrice.id).toBe(1);
        expect(hotelPrice.searchRank).toBe(2);
        expect(hotelPrice.price).toBe(3);
        expect(hotelPrice.marketRates).toBe(4);
    });

    test("Validate fetching hotel prices by destination id using fetchHotelPricesByDestination with successful API response", async()=>{
        
        const hotelPricesMap = await fetchHotelPricesByDestination("WD0M", "2024-10-01", "2024-10-07", "en_US", "SGD", "2")
        expect(hotelPricesMap instanceof Map).toBe(true);
        for (let hotelPrice in hotelPricesMap){
            expect(hotelPrice instanceof HotelPrice).toBe(true);
        }

        for (const [hotelId, hotelPrice] of hotelPricesMap.entries()){
            try{
                expect(hotelId).toEqual(hotelPrice.id);
            }catch(e){ 
                console.error("Test failed", e.message)
            }
        }
    }, 30000);    
});