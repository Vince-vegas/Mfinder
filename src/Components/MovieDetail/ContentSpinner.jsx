import React from 'react';
import Spinner from '../ShowLoad/Spinner';

const ContentSpinner = () => (
  <div className='mn-showload'>
    <Spinner
      addCssStyle={{
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
      }}
    />
  </div>
);

export default ContentSpinner;
