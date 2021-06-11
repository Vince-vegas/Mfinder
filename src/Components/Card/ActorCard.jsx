import React from 'react';
import { Link } from 'react-router-dom';
import Observer from '@researchgate/react-intersection-observer';
import Fade from 'react-reveal/Fade';

const ActorCard = ({ name, profile_path, movieId }) => {
  const handleChange = (entry, unobserve) => {
    if (entry.isIntersecting) {
      entry.target.setAttribute('src', entry.target.dataset.image);
      unobserve();
    }
  };

  return (
    <Fade big>
      <div className='actor-item mb30'>
        <Link to={`/actor/movies/${movieId}`} className='actor-link'>
          <div className='actor-box'>
            <div className='actor-image'>
              <Observer onChange={handleChange}>
                <img
                  alt={name}
                  data-image={`https://image.tmdb.org/t/p/w300${profile_path}`}
                />
              </Observer>
            </div>
            <div className='sub-content'>
              <h3>{name}</h3>
            </div>
          </div>
        </Link>
      </div>
    </Fade>
  );
};

export default React.memo(ActorCard);
