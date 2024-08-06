import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PageHeader from '../pageHeader/pageHeader.js';
import SearchBar from '../searchBar/searchBar.js';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Rating from '@mui/material/Rating';
import Slider from 'react-slick';
import UserSelect from '../pageHeader/UserSelect.js';
import LinearProgress from '@mui/material/LinearProgress';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './landingPage.css';

const LandingPage = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      const url = `${process.env.REACT_APP_SERVER_URL}/search/destination/WD0M`;
      const data = {
        checkin: '2024-10-01',
        checkout: '2024-10-07',
        lang: 'en_US',
        guests: 2,
        currency: 'SGD'
      };

      try {
        console.log('Fetching hotels...');
        const response = await axios.post(url, data);
        const filteredHotels = response.data.filter(data => data.hotel.rating > 4.5);
        setHotels(filteredHotels.splice(6, 10) || []);
        console.log("length: ", filteredHotels.length);
        setLoading(false);
        console.log('Response data:', response.data[0]);
      } catch (error) {
        console.error('Error fetching hotels:', error);
        setError('Failed to load hotels.');
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);


  if (loading){
    return (
      <div className='loading-container'>
        <div className='loading-content'>
          <LinearProgress sx={{ width: 200 }} />
          <p>Loading...</p>
        </div>
      </div>
    );
  }
  if (error) return <div className='Error'>{error}</div>;

  const topDestSliderSettings = {
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  const SGhotelsliderSettings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
   

  return (
    <div className='LandingPage'>
      <PageHeader />
      <h2>Your Perfect Stay, A Click Away!</h2>
      <SearchBar />
      <div className='hotel-container'>
      <div className='heading'>Top Destinations</div>
      <Slider {...topDestSliderSettings} className='slider-grid'>
        <Card sx={{ maxWidth: 405}}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="150"
              image='singapore-jewel-changi-airport.jpg'
              alt='Singapore'
            />
            <CardContent>
            <Typography gutterBottom variant='h6' component="div">
              Singapore
            </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card sx={{ maxWidth: 405 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="150"
              image='japan-sakura.jpg'
              alt='Japan'
            />
            <CardContent>
            <Typography gutterBottom variant='h6' component="div">
              Tokyo
            </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card sx={{ maxWidth: 405 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="150"
              image='rome-italy.jpg'
              alt='Rome'
            />
            <CardContent>
            <Typography gutterBottom variant='h6' component="div">
              Rome
            </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Slider>
      <div className='heading'>Top Hotels in Singapore</div>
      <Slider {...SGhotelsliderSettings}>
        {hotels.length === 0 ? (
          <div>No hotels found.</div>
        ) : (
          hotels.map((item, index) => {
            const imageUrl = item.hotel.imageDetails
              ? `${item.hotel.imageDetails.prefix}1${item.hotel.imageDetails.suffix}`
              : 'defaultImage.jpg';

            return (
              <Card sx={{ maxWidth: 405}} key={item.hotel.id}>
                <Link to={`/hotel/${item.hotel.id}`} style={{ textDecoration: 'none', color:'black'}}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="150"
                      image={imageUrl}
                      alt={item.hotel.name || 'Hotel image'}
                    />
                    <CardContent>
                      <Typography gutterBottom variant='h6' component="div">
                        {item.hotel.name || 'Hotel Name'}
                      </Typography>
                      <Rating name="read-only" value={item.hotel.rating} readOnly />
                    </CardContent>
                  </CardActionArea>
                </Link>
              </Card>
            );
          })
        )}
      </Slider>
      </div>
    </div>
  );
};

export default LandingPage;
