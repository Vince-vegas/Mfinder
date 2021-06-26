import React, { useState } from 'react';

const ReviewHolder = ({ author, created_at, content, avatar_path }) => {
  const [showComment, setShowComment] = useState(false);

  const onShowComment = () => {
    setShowComment((showItem) => !showItem);
  };

  return (
    <div className='review-container'>
      <div className='review-box' onClick={onShowComment}>
        <div className='review-image'>
          <img
            src={`${
              avatar_path && avatar_path.includes('https')
                ? avatar_path.substring(1)
                : '/images/gravatar-img.png'
            }`}
            alt={author}
          />
        </div>
        <h1>{author}</h1>
      </div>
      <div className={`${showComment ? 'comment show-comment' : 'comment'}`}>
        <div className='text'>
          <p className='created-at'>
            {new Date(created_at).toLocaleDateString()}
          </p>
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewHolder;
