import React, { useState } from 'react';
import './App.css'
import Button from '@mui/material/Button';

const fetchAPI = async () => {
  const response = await fetch('/hotel/diH7');
  const data = await response.json();
  return data.name;
};

function App() {
  const [data, setData] = useState('');

  const fetchData = () => {
    fetchAPI()
      .then(apiData => {
        setData(apiData); // Update state with fetched data
      });
  };

  const handleClick = () => {
    setData('');
  }

  return (
    <div className='center'>
      <p>Hello test</p>
      <p>{data}</p>
      <Button variant="contained" onClick={fetchData}>Fetch API</Button>
      <button onClick={handleClick}>Reset</button>
    </div>
  );
}

export default App;
