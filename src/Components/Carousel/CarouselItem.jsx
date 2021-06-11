import React from 'react';
import { Link } from 'react-router-dom';

const CarouselItem = ({ title, backdrop_path, overview, vote_average, id }) => {
  return (
    <div
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w1280${backdrop_path})`,
      }}
      className='carousel-item'
    >
      <div className='content'>
        <span>{vote_average}</span>
        <h1 className='title'>{title}</h1>
        <p>{overview}</p>

        <Link to={`/title/${id}`} className='btn btn-carousel'>
          Visit
        </Link>
      </div>
    </div>
  );
};

export default CarouselItem;
