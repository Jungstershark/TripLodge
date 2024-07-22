import fetch from 'node-fetch';
import { ascendaAPI } from '../../../config.js'; // Adjust the path as necessary

async function getHotelPrices({ destination_id, checkin, checkout, lang, currency, guests }) {
  const apiUrl = `${ascendaAPI.baseUrl}${ascendaAPI.endpoints.hotelPricesByDestination}?destination_id=${destination_id}&checkin=${checkin}&checkout=${checkout}&lang=${lang}&currency=${currency}&guests=${guests}&partner_id=1`;
    console.log(apiUrl);
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log('Response Data:', data);

    if (!data || !data.completed) {
      throw new Error('Invalid response from API');
    }

    return data.hotels; // Return the hotels array, which could be empty
  } catch (error) {
    console.error('Error fetching hotel prices:', error);
    throw new Error('Error fetching hotel prices');
  }
}

async function getHotelPriceById({ id, destination_id, checkin, checkout, lang, currency, guests }) {
  const apiUrl = `${ascendaAPI.baseUrl}${ascendaAPI.endpoints.getHotelPrice(id)}?destination_id=${destination_id}&checkin=${checkin}&checkout=${checkout}&lang=${lang}&currency=${currency}&guests=${guests}&partner_id=1`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log('Response Data:', data);

    if (!data || !data.completed) {
      throw new Error('Invalid response from API');
    }

    return data.hotels; // Return the hotels array, which could be empty
  } catch (error) {
    console.error('Error fetching hotel price details:', error);
    throw new Error('Error fetching hotel price details');
  }
}

export { getHotelPrices, getHotelPriceById };
