import React from 'react';
import ShowLoad from './ShowLoad';

const PageLoad = () => (
  <div className='mn-showload'>
    <ShowLoad
      addStyle={{
        position: 'fixed',
        top: '50%',
        transform: 'translateY(-50%)',
      }}
    />
  </div>
);

export default PageLoad;
