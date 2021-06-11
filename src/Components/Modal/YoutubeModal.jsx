import React from 'react';
import ExitIcon from '../../Assets/SvgIcon/ExitIcon';

const YoutubeModal = ({ onPlayTrailer, trailerKey }) => {
  return (
    <div onClick={onPlayTrailer} className='vd-holder'>
      <div className='yt-box'>
        <div className='embed-container'>
          <div onClick={onPlayTrailer} className='icon-holder'>
            <ExitIcon />
          </div>
          <iframe
            title='yt'
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
            frameBorder='4'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default YoutubeModal;
