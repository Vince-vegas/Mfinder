import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/main-page.scss';

const Main = () => {
  return (
    <div className='mn-homepage' style={{backgroundImage: "url(/images/background-movie.jpg)"}}>
      <div className='container'>
        <div className='row align-center justify-center hp-row'>
          <div className='hp-discover'>
            <h2 className='highlight sub-intro-text'>Find your next favorite</h2>
            <h1 className='main-intro-text'>Search. <span className='highlight'>Discover.</span> Watch.</h1>
            <p className='sub-text'>Search for any movie, and get instant suggestions.</p>
            <Link to='/discover' className='btn hp-btn'>
              Discover Movies
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
