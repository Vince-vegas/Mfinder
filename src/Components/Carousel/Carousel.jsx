import React from 'react';
import { carouselMovies } from '../../Store/CarouselMovies/CarouselReducers';
import CarouselItem from './CarouselItem';

const Carousel = () => {
  return (
    <div className='carousel'>
      <div className='slider'>
        {carouselMovies.map((item) => {
          return (
            <CarouselItem
              key={item.id}
              title={item.title}
              backdrop_path={item.backdrop_path}
              overview={item.overview}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
