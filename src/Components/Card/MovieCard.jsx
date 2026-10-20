import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ vote_average, poster_path, original_title, paramsId }) => {
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
    <div className="w-50 mv-item mb35 fade-in" ref={cardRef}>
      <Link to={`/title/${paramsId}`} className="block">
        <div className="mv-card">
          <div className="mv-image mb5">
            <img
              decoding="async"
              loading='lazy'
              alt={original_title}
              src={`https://image.tmdb.org/t/p/w300${poster_path}`}
            />
          </div>
          <span className="mv-rated">
            <p>{Number(vote_average).toFixed(1)}</p>
          </span>
          <p className="mv-title fw500">{original_title}</p>
        </div>
      </Link>
    </div>
  );
};

export default React.memo(MovieCard);
