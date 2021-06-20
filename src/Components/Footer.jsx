import React from 'react';
import '../Styles/footer.scss';
import ReactDOM from 'react-dom';

// footer
const Footer = () => {
  return ReactDOM.createPortal(
    <div className='footer'>
      <div className='container'>
        <div className='row justify-center'>
          <div className='col-md-6'>
            <div className='ft-content'>
              <div className='ft-img'>
                <img src={'/images/movie-db.png'} alt='TMDB' />
              </div>
              <h1 className='footer-text'>Developed by Vince S. Tañan</h1>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('footer-section')
  );
};

export default Footer;
