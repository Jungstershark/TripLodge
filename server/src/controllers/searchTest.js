import axios from 'axios';
// temporary

// KS5q
// 0804 0807

// xmXl
// const data = {
//   checkin: '2024-10-01',
//   checkout: '2024-10-07',
//   lang: "en_US",
//   currency: "SGD",
//   guests: 1
// };

async function testPostRequest() {
  const url = 'http://localhost:5005/search/destination/WD0M';
  
  // Parameters in POST body
  const data = {
    checkin: '2024-10-01',
    checkout: '2024-10-07',
    lang: "en_US",
    currency: "SGD",
    guests: 0
  };


  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.error('Error making POST request:', error);
  }
}

const hotelList = await testPostRequest();
console.log('success');
console.log(hotelList.length);