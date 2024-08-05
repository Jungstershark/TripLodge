import React from 'react';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/system';

const SliderContainer = styled('div')({
  width: 300,
  padding: '0 20px',
  margin: '0 0 0 -15px',
});

const CustomSlider = styled(Slider)({
  color: 'darkblue',
});

const PriceRangeSlider = ({ value, onChange }) => {
  return (
    <SliderContainer>
      <CustomSlider
        value={value}
        onChange={onChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        min={0}
        max={1000}
      />
    </SliderContainer>
  );
};

export default PriceRangeSlider;
