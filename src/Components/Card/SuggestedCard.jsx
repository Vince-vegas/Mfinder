import React from 'react';
import { Link } from 'react-router-dom';
import Observer from '@researchgate/react-intersection-observer';

const SuggestedCard = ({ poster_path, title, id }) => {
  const handleChange = (entry, unobserve) => {
    if (entry.isIntersecting) {
      entry.target.setAttribute('src', entry.target.dataset.image);
      unobserve();
    }
  };

  return (
    <div className="w-50 mv-item mb30">
      <Link to={`/title/${id}`} className="mv-link">
        <div className="mv-image">
          <Observer onChange={handleChange}>
            <img
              alt={title}
              data-image={`https://image.tmdb.org/t/p/w300${poster_path}`}
            />
          </Observer>
        </div>
      </Link>
    </div>
  );
};

export default React.memo(SuggestedCard);
