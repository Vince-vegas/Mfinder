import React from 'react';
import MovieCard from '../Card/MovieCard';

// render when movie array have items
const CollectMovies = ({ moviesArray }) => (
  <div className='row justify-between'>
    {moviesArray &&
      moviesArray.map(({ id, ...otherProps }) => (
        <MovieCard key={id} {...otherProps} paramsId={id} />
      ))}
  </div>
);

export default CollectMovies;
