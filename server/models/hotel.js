import axios from "axios";

import { ascendaAPI } from "./ascendaApi.js";

class Hotel {
    constructor(id, name, latitude, longitude, address, rating, categories, description, amenities, image_details) {
        // parameter names follow JSON response attribute names
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

/**
 * Fetch all hotels at specified destination.
 * @param {string} destination_id - The ID of the destination.
 * @returns {Promise<Map<string, Hotel>>} A Promise that resolves to a Map with Hotel id as keys and Hotel objects as values.
 * @throws Will throw an error if the request fails.
 */
async function fetchHotelsByDestination(destination_id) {
    try {
        // GET hotels from API
        const response = await axios.get(ascendaAPI.getHotelsByDestination, {
            params: {
                destination_id: destination_id
            }
        }); 
        const hotelsData = response.data; // array: response body (already parsed from the JSON response)

        // Convert each hotel data object into a Hotel instance and populate the Map
        const hotelsMap = hotelsData.reduce((map, hotelData) => {
            // Create a new Hotel instance
            const hotel = new Hotel(
            hotelData.id,
            hotelData.name,
            hotelData.latitude,
            hotelData.longitude,  
            hotelData.address,
            hotelData.rating,
            hotelData.categories,
            hotelData.description,
            hotelData.amenities,
            hotelData.image_details
            );
            
            // Add the Hotel instance to the map with the id as the key
            map.set(hotel.id, hotel);
            
            // Return the updated map to be used as the accumulator in the next iteration
            return map;
        }, new Map()); // Initial value for the accumulator

        return hotelsMap;
        
    } catch(error) {
        console.error("Error fetching hotels by destination:", error);
        throw error;
    }
}

/**
 * Fetch a hotel by its ID.
 * @param {string} id - The ID of the hotel.
 * @returns {Promise<Hotel>} A promise that resolves to a Hotel instance.
 * @throws Will throw an error if the request fails.
 */
async function fetchHotel(id) {
    try {
        // GET hotel from API
        const response = await axios.get(ascendaAPI.getHotel(id)); 
        const hotelData = response.data;

        // Convert hotel data object into a Hotel instance
        const hotel = new Hotel(
            hotelData.id,
            hotelData.name,
            hotelData.latitude,
            hotelData.longitude,
            hotelData.address,
            hotelData.rating,
            hotelData.categories,
            hotelData.description,
            hotelData.amenities,
            hotelData.image_details
        );
        
        return hotel;
    } catch(error) {
        console.error("Error fetching hotel by ID:", error);
        throw error;
    }
}

export { Hotel, fetchHotelsByDestination, fetchHotel };