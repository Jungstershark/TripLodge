// Ascenda Mock Hotel Booking API
const apiUrl = 'https://hotelapi.loyalty.dev/api/';
const ascendaAPI = {
    getHotelPricesByDestination: `${apiUrl}hotels/prices`,
    getHotelPrice: (id) => `${apiUrl}hotels/${id}/price`,
    getHotelsByDestination: `${apiUrl}hotels`,
    getHotel: (id) => `${apiUrl}hotels/${id}`
};

export { ascendaAPI };