import React from 'react';
import { Link } from 'react-router-dom';
import Observer from '@researchgate/react-intersection-observer';
import Fade from 'react-reveal/Fade';

const MovieCard = ({ vote_average, poster_path, original_title, paramsId }) => {
  const handleChange = (entry, unobserve) => {
    if (entry.isIntersecting) {
      entry.target.setAttribute('src', entry.target.dataset.image);
      unobserve();
    }
  };

  return (
    <Fade big>
      <div className="w-50 mv-item mb35">
        <Link to={`/title/${paramsId}`} className="block">
          <div className="mv-card">
            <div className="mv-image mb5">
              <Observer onChange={handleChange}>
                <img
                  alt={original_title}
                  data-image={`https://image.tmdb.org/t/p/w300${poster_path}`}
                />
              </Observer>
            </div>
            <span className="mv-rated">
              <p>{Number(vote_average).toFixed(1)}</p>
            </span>
            <p className="mv-title fw500">{original_title}</p>
          </div>
        </Link>
      </div>
    </Fade>
  );
};

export default React.memo(MovieCard);
