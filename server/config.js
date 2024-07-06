const ascendaAPI = {
    baseUrl: 'https://hotelapi.loyalty.dev/',
    endpoints: {
        hotelPricesByDestination: `api/hotels/prices/`,
        getHotelPrice: (id) => `api/hotels/${id}/price`,
        hotelInfoByDestination: `api/hotels`,
        getHotelInfo: (id) => `api/hotels/${id}`
    }
};

export { ascendaAPI };
