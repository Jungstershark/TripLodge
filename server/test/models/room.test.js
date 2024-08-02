import { fetchRoomPrices, Room } from "../../src/models/room.js";

describe("room instance test", ()=>{
    test("can create Room instance given parameters", ()=>{
        const room = new Room(
            1,
            5,
            "This room is great!",
            true,
            "This room has great WiFi, great shower and comfy bed.",
            "I am a longer description hehehe, peepeepoopoo nei hou mou.",
            ["https://thumbs.dreamstime.com/b/hotel-rooms-8146308.jpg"],
            ["Gym", "Free Parking", "Free Wi-Fi", "Dry Cleaning", "Washing Machine"],
            500.00,
            550.00
        )
        expect(room.hotelId).toBe(1);
        expect(room.key).toBe(5);
        expect(room.roomNormalizedDescription).toBe("This room is great!");
        expect(room.freeCancellation).toBe(true);
        expect(room.roomDescription).toBe("This room has great WiFi, great shower and comfy bed.");
        expect(room.longRoomDescription).toBe("I am a longer description hehehe, peepeepoopoo nei hou mou.");
        expect(room.images).toEqual(["https://thumbs.dreamstime.com/b/hotel-rooms-8146308.jpg"]);
        expect(room.amenities).toEqual(["Gym", "Free Parking", "Free Wi-Fi", "Dry Cleaning", "Washing Machine"]);
        expect(room.price).toBe(500.00);
        expect(room.marketRates).toBe(550.00);
    })
})

describe("room API call test", ()=>{
    test("can fetch room prices", async ()=>{
        const roomPrice = await fetchRoomPrices("diH7","WD0M","2024-10-01","2024-10-07","en_US","SGD",2)
        // expect(roomPrice.length).toBe(41);
        expect(roomPrice instanceof Array).toBe(true);
    }, 20000)
})