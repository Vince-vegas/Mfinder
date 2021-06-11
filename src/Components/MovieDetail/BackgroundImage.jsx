import React from 'react';

const BackgroundImage = ({ backdrop_path }) => (
  <div
    className="info-image"
    style={{
      backgroundImage:
        backdrop_path &&
        `url(https://image.tmdb.org/t/p/w1280${backdrop_path})`,
    }}
  ></div>
);

export default BackgroundImage;
