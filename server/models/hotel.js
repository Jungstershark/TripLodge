import axios from "axios";

import { ascendaAPI } from "./ascendaApi.js";

class Hotel {
    constructor(id, name, latitude, longtitude, address, rating, categories, description, amenities, image_details) {
        // parameter names follow JSON response attribute names
        this.id = id;
        this.name = name;
        this.latitude = latitude;
        this.longtitude = longtitude;
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
 * @returns {Promise<Hotel[]>} A promise that resolves to an array of Hotel instances.
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

        // Convert each hotel data object into a Hotel instance
        const hotelList = hotelsData.map(hotel => new Hotel(
            hotel.id,
            hotel.name,
            hotel.latitude,
            hotel.longtitude,
            hotel.address,
            hotel.rating,
            hotel.categories,
            hotel.description,
            hotel.amenities,
            hotel.image_details
        ));

        return hotelList;
        
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
            hotelData.longtitude,
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