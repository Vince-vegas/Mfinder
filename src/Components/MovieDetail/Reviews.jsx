import React from 'react';
import { useSelector } from 'react-redux';
import ReviewHolder from '../ReviewHolder';

const Reviews = (props) => {
  const reviews = useSelector((state) => state.movieDetails.reviews);
  console.log(reviews);

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
