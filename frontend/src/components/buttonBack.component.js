import React, { useState } from 'react';
import '../assets/css/buttonBack.css';
import { IoIosArrowBack } from "react-icons/io";


const BackButton = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);


    return (
        <button onMouseEnter={() => setIsHovered(true)} 
                onMouseLeave={() => setIsHovered(false)} 
                className={`back-button ${isHovered ? 'hover' : 'default'} `}>
            <IoIosArrowBack size={20} />
            <input
                    type = 'text'
                    className={`input-text font-family-extrabold `}
                    value='Quay lại'
                />
        </button>
    );
  };
  
  export default BackButton;