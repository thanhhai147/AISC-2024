import React, { useState } from 'react';
import '../assets/css/buttonLoginGoogle.css';
import { FcGoogle } from "react-icons/fc";


const GoogleLoginButton = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);


    return (
        <button onMouseEnter={() => setIsHovered(true)} 
                onMouseLeave={() => setIsHovered(false)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)} 
                className={`google-login-button ${isHovered && !isFocused ? 'hover' : ''} ${isHovered && isFocused ? 'focus' : ''} ${!isHovered  ? 'default' : ''}`}>
            <FcGoogle size={20} />
            <input
                    type = 'text'
                    className={`text-input font-family-light ${isHovered && !isFocused ? 'link-color' : ''}`}
                    value='Đăng nhập bằng google'
                />
        </button>
    );
  };
  
  export default GoogleLoginButton;