import React from 'react';

const SortLayout = (props) => (
  <div className='collection-opt mb40'>
    <ul className='sort-menu'>{props.children}</ul>
  </div>
);

export default SortLayout;
