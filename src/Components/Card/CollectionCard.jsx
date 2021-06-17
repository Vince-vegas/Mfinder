import React from 'react';
import { Link } from 'react-router-dom';

const CollectionCard = ({ title, imageSrc, overview, movieLink }) => {
  return (
    <div className='collection-card row'>
      <div className='col-sm-4 col-md-2'>
        <div className='image'>
          <img src={`https://image.tmdb.org/t/p/w300${imageSrc}`} alt={title} />
        </div>
      </div>

      <div className='col-sm-8 col-md-10'>
        <div className='content'>
          <h1>{title}</h1>
          <p>{overview}</p>
          <Link className='btn' to={`/title/${movieLink}`}>
            View Movie
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
