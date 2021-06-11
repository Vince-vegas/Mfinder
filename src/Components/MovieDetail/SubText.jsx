import React from 'react';

// Movie Info's Starring people
// Movie Details Starring people
const SubText = ({ subTitle, subText }) => (
  <p className='sub-info'>
    <span className='sub-title'>{subTitle}: </span>
    {subText}
  </p>
);

export default SubText;
