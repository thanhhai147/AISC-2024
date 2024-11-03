import React, { useState } from 'react';
import '../assets/css/buttonLike.css';
import { BiLike } from "react-icons/bi";

const LikeButton = ({ initialLikes = 0 }) => {

  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1); 
    } else {
      setLikes(likes + 1);  
    }
    setLiked(!liked); 
  };

  return (
    <div className='like-button-wrapper font-family-regular secondary-color'>
        <BiLike 
            className={`like-button ${liked ? 'liked' : ''}`} 
            onClick={handleLike}
        />
        <span className={`count-like ${liked ? 'liked' : ''} font-family-regular`}>{likes}</span>
    </div>
  );
};

export default LikeButton;
