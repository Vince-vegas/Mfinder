import React from 'react';
import ReviewHolder from '../ReviewHolder';

const Reviews = (props) => {
  return (
    <div className='main-reviews'>
      <h1>Reviews</h1>

      {props.reviews?.map((item) => (
        <ReviewHolder
          key={item.id}
          avatar_path={item.author_details.avatar_path}
          author={item.author}
          created_at={item.created_at}
          content={item.content}
        />
      ))}
    </div>
  );
};

export default Reviews;
