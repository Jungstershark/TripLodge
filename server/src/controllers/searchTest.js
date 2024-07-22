import axios from 'axios';
// temporary

async function testPostRequest() {
  const url = 'http://localhost:3001/search/destination/WD0M';
  
  // Parameters in POST body
  const data = {
    checkin: '2024-10-01',
    checkout: '2024-10-07',
    lang: "en_US",
    currency: "SGD",
    guests: 2
  };


  try {
    const response = await axios.post(url, data);
    console.log(response.data);
  } catch (error) {
    console.error('Error making POST request:', error);
  }
}

testPostRequest();