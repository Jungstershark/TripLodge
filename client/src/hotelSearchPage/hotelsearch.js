import React from 'react';
import PageHeader from '../pageHeader/pageHeader';
import SearchBar from '../searchBar/searchBar';
import FilterSection from './filterSection/filterSection.js';
import HotelList from './hotelList/hotelList';
import './hotelsearch.css'; 

function HotelSearch() {
  const hotels = [
    {
      name: 'Hotel Name 1',
      description: 'Hotel Description 1'
    },
    {
      name: 'Hotel Name 2',
      description: 'Hotel Description 2'
    },
    {
      name: 'Hotel Name 3',
      description: 'Hotel Description 3'
    }
  ];

  return (
    <> 
      <PageHeader />
      <SearchBar />
      <div className="container">
        <FilterSection />
        <HotelList hotels={hotels} />
      </div>
    </>
  );
}

export default HotelSearch;
