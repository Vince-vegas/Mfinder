import React from 'react';

const CarouselItem = ({ title, backdrop_path, overview }) => {
  return (
    <div
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w1280${backdrop_path})`,
      }}
      className='carousel-item'
    >
      <div className='content'>
        <h1>{title}</h1>
        <p>{overview}</p>
      </div>
    </div>
  );
};

export default CarouselItem;
