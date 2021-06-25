import React from 'react';
import { Link } from 'react-router-dom';

const Collection = (props) => {
  return (
    <div
      className='collection'
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w780/${props.background})`,
      }}
    >
      <div className='holder'>
        <h1>Part of the {props.name}</h1>

        <Link className='btn' to={`/collection/${props.collectionId}`}>
          View the Collection
        </Link>
      </div>
    </div>
  );
};

export default Collection;
