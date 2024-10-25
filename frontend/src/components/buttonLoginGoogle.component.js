import React, { useState } from 'react';
import '../assets/css/buttonLoginGoogle.css';
import { FcGoogle } from "react-icons/fc";


const GoogleLoginButton = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);


    return (
        <button 
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)} 
            className={`google-login-button ${isFocused ? 'google-login-button-focus' : isHovered ? 'google-login-button-hover' : 'google-login-button-default'}`}
        >
            <FcGoogle size={20} />
            <input
                type = 'text'
                className={`google-login-button-input-text font-family-light ${isHovered && !isFocused ? 'link-color' : ''}`}
                value='Đăng nhập bằng google'
            />
        </button>
    );
  };
  
  export default GoogleLoginButton;