import axios from 'axios';
// temporary

async function testPostRequest() {
  const url = 'https://example.com/api';
  const data = {
    key1: 'value1',
    key2: 'value2'
  };

  try {
    const response = await axios.post(url, data);
    console.log(response.data);
  } catch (error) {
    console.error('Error making POST request:', error);
  }
}

testPostRequest();