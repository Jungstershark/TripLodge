import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import { ImageListItem } from '@mui/material';

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function QuiltedImageList({itemData}) {
  return (
    <ImageList
      sx={{ width: 400, height: 200 }}
      variant="quilted"
      cols={3}
      rowHeight={200}
    >
      {itemData?.imageDetails && Array.from({ length: itemData.imageDetails.count }).map((_, index) => (
        <ImageListItem key={itemData.img} cols={itemData.cols || 1} rows={itemData.rows || 1}>
          <img
            key={index} 
            src={`${itemData.imageDetails.prefix}${index + 1}${itemData.imageDetails.suffix}`} 
            alt={`itemData ${index + 1}`} />
        </ImageListItem>
      ))}
    </ImageList>
  );
}