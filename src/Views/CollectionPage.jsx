import React, { useEffect, useState } from 'react';
import '../Styles/collection.scss';
import { useParams } from 'react-router-dom';
import CollectionCard from '../Components/Card/CollectionCard';

const CollectionPage = () => {
  const [collection, setCollection] = useState({});
  const [movie, setMovie] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/collection/${id}?api_key=${process.env.REACT_APP_TMDB_ID}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCollection(data);
        setMovie(data.parts);
      });

    return () => {
      setCollection({});
      setMovie([]);
    };
  }, []);

  return (
    <div className='main-collection'>
      <div className='container'>
        <div
          className='collection-header'
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w780${collection.backdrop_path})`,
          }}
        >
          <div className='content'>
            <h1>{collection.name}</h1>
            <p>{collection.overview}</p>
          </div>
        </div>

        {movie.length > 0 &&
          movie.map((item) => {
            return (
              <CollectionCard
                key={item.id}
                title={item.title}
                imageSrc={item.poster_path}
                overview={item.overview}
                movieLink={item.id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default CollectionPage;
