import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/main-page.scss';

const Main = () => {
  return (
    <div className="mn-homepage">
      <div className="container">
        <div className="row align-center justify-center hp-row">
          <div className="hp-discover mb50">
            <Link to="/home" className="btn hp-btn">
              Discover Movies
            </Link>
          </div>
          <div className="hp-content">
            <p>
              Discover the latest and top movies worldwide. This website uses
              <a
                href="https://developers.themoviedb.org/3"
                className="link"
                target="blank"
              >
                {' '}
                The Movie DataBase API
              </a>{' '}
              for retrieving movie data to this site. Its goal is to provide
              users to browse all upcoming and exciting movies for free.{' '}
              <a
                href="https://developers.themoviedb.org/3"
                className="link"
                target="blank"
              >
                Learn more.
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
