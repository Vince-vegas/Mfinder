import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/page-error.scss';

const PageNotFound = () => {
  return (
    <div className="page-error">
      <div className="container text-center">
        <div className="error-message">
          <h1>Page not found. 🎬</h1>
          <Link to="/discover" className="btn">
            Discover movies
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
