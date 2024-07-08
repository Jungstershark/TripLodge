import fetch from 'node-fetch';
import { ascendaAPI } from '../config.js';

async function getHotelsByDestination({ destination_id }) {
  const apiUrl = `${ascendaAPI.baseUrl}${ascendaAPI.endpoints.hotelInfoByDestination}?destination_id=${destination_id}`;
  console.log(apiUrl);

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log('Response Data:', data);

    if (!data || !data.hotels) {
      throw new Error('Invalid response from API');
    }

    return data.hotels; // Return the hotels array
  } catch (error) {
    console.error('Error fetching hotels:', error);
    throw new Error('Error fetching hotels');
  }
}

async function getHotelById({ hotel_id }) {
  const apiUrl = `${ascendaAPI.baseUrl}${ascendaAPI.endpoints.getHotelInfo(hotel_id)}`;
  console.log(apiUrl);

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log('Response Data:', data);

    if (!data || !data.hotel) {
      throw new Error('Invalid response from API');
    }

    return data.hotel; // Return the hotel object
  } catch (error) {
    console.error('Error fetching hotel details:', error);
    throw new Error('Error fetching hotel details');
  }
}

async function getAllHotels() {
  const apiUrl = `${ascendaAPI.baseUrl}${ascendaAPI.endpoints.allHotels}`;
  console.log(apiUrl);

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log('Response Data:', data);

    if (!data || !data.hotels) {
      throw new Error('Invalid response from API');
    }

    return data.hotels; // Return the hotels array
  } catch (error) {
    console.error('Error fetching all hotels:', error);
    throw new Error('Error fetching all hotels');
  }
}

export { getHotelsByDestination, getHotelById, getAllHotels };
