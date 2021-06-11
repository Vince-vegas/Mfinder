import React from 'react';
import MovieCard from '../Card/MovieCard';

const CollectMovies = ({ moviesArray }) => (
  <div className='row justify-between'>
    {moviesArray.map(({ id, ...otherProps }) => (
      <MovieCard key={id} {...otherProps} paramsId={id} />
    ))}
  </div>
);

export default CollectMovies;
