import React from 'react';
import PageHeader from '../pageHeader/pageHeader.js';
import SearchBar from '../searchBar/searchBar.js';
// import axios from 'axios';

import './landingPage.css';

function LandingPage() {
  
  return (
    <>
      <div className='LandingPage'>
        <PageHeader/>
        <h2> Your Perfect Stay, A Click Away! </h2>
        <SearchBar />
        <div className='TopDestination'>Top Destinations</div>
        <div className='Hotels'>
          <div className='Hotel1Container'>
            <img className="Hotel1" src={process.env.PUBLIC_URL + "./Hotel1.jpg"} alt="Error displaying logo"></img>
            <h3>Hotel Name</h3>
            <div>Hotel Rating</div>
          </div>
          <div className='Hotel2Container'>
            <img className="Hotel2" src={process.env.PUBLIC_URL + "./Hotel2.jpg"} alt="Error displaying logo"></img> 
            <h3>Hotel Name</h3>
            <div>Hotel Rating</div>
          </div>
          <div className='Hotel3Container'>
            <img className="Hotel3" src={process.env.PUBLIC_URL + "./Hotel3.jpg"} alt="Error displaying logo"></img>
            <h3>Hotel Name</h3>
            <div>Hotel Rating</div>
          </div>
          <div className='Hotel4Container'> 
            <img className="Hotel4" src={process.env.PUBLIC_URL + "./Hotel4.jpg"} alt="Error displaying logo"></img>
            <h3>Hotel Name</h3>
            <div>Hotel Rating</div>
          </div>
          <div className='Hotel5Container'>
            <img className="Hotel5" src={process.env.PUBLIC_URL + "./Hotel5.jpg"} alt="Error displaying logo"></img>
            <h3>Hotel Name</h3>
            <div>Hotel Rating</div>
          </div>
          <div className='Hotel6Container'> 
            <img className="Hotel6" src={process.env.PUBLIC_URL + "./Hotel6.jpg"} alt="Error displaying logo"></img>
            <h3>Hotel Name</h3>
            <div>Hotel Rating</div>
          </div> 
        </div>
      </div>
    </>
  )
}

export default LandingPage;
