import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ActorCard = ({ name, profile_path, movieId }) => {
  const cardRef = useRef(null)

  useEffect(() => {
    const card = cardRef.current

    if(!card) return;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0]

      if(entry.isIntersecting) {
        // allow react to know if visible (use usestate) is better practice
        // for simple animation, modify direct dom is ok
        card.classList.add("visible")
        observer.unobserve(card)
      }
    }, {
      threshold: 0.1,
    })

    observer.observe(card)

    return () => observer.disconnect()
  }, [])

  return (
    <div className='actor-item mb30 fade-in' ref={cardRef}>
      <Link to={`/actor/movies/${movieId}`} className='actor-link'>
        <div className='actor-box'>
          <div className='actor-image'>
            <img
              decoding="async"
              loading='lazy'
              alt={name}
              src={`https://image.tmdb.org/t/p/w300${profile_path}`}
            />
          </div>
          <div className='sub-content'>
            <h3>{name}</h3>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default React.memo(ActorCard);
