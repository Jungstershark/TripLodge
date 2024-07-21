import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/system';

// Styled component for the container
const SliderContainer = styled('div')({
  width: 300,
  padding: '0 20px',
  margin:'0 0 0 -15px',
});

// Styled component for the slider
const CustomSlider = styled(Slider)({
  color: 'darkblue',
});

const PriceRangeSlider = () => {
  const [value, setValue] = useState([20, 80]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <SliderContainer>
      
      <CustomSlider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        min={0}
        max={100}
      />
    </SliderContainer>
  );
};

export default PriceRangeSlider;
