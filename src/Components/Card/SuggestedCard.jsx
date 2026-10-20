import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SuggestedCard = ({ poster_path, title, id }) => {
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
    <div className="w-50 mv-item mb30 fade-in" ref={cardRef}>
      <Link to={`/title/${id}`} className="mv-link">
        <div className="mv-image">
          <img
            decoding='async'
            loading='lazy'
            alt={title}
            src={`https://image.tmdb.org/t/p/w300${poster_path}`}
          />
        </div>
      </Link>
    </div>
  );
};

export default React.memo(SuggestedCard);
