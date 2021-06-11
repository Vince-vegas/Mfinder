import React, { useRef, useState } from 'react';
import { carouselMovies } from '../../Store/CarouselMovies/CarouselReducers';
import CarouselItem from './CarouselItem';

const Carousel = () => {
  const [itemId, setItemId] = useState(0);
  const carouselRef = useRef(null);

  const onSetIndicators = (index) => {
    setItemId(index);
  };

  return (
    <div ref={carouselRef} className='carousel'>
      <div
        className='slider'
        style={{
          transform: `translateX(-${
            itemId * carouselRef.current?.clientWidth
          }px)`,
        }}
      >
        {carouselMovies.map((item) => {
          return (
            <CarouselItem
              key={item.id}
              id={item.id}
              title={item.title}
              backdrop_path={item.backdrop_path}
              overview={item.overview}
              vote_average={item.vote_average}
            />
          );
        })}
      </div>

      <ul className='carousel-indicators'>
        {carouselMovies.map((item, index) => (
          <li
            key={index}
            className={`${itemId === index && 'selected'}`}
            onClick={onSetIndicators.bind(this, index)}
          ></li>
        ))}
      </ul>
    </div>
  );
};

export default Carousel;
