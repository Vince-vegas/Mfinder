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
                : 'https://www.gravatar.com/avatar/1cacf1bc403efca2e7a58bcfa9574e4d?s=200&r=pg&d=mm'
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
