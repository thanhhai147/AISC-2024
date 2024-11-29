import React, { useState } from 'react';
import '../assets/css/buttonBack.css';
import { IoIosArrowBack } from "react-icons/io";

const BackButton = ({ onClick }) => { 
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button 
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)} 
            onClick={onClick} 
            className={`back-button ${isHovered ? 'back-button-hover' : 'back-button-default'} `}
        >
            <IoIosArrowBack size={20} />
            <span 
                className={`back-button-text font-family-extrabold`}
            >
                Quay lại
            </span>
        </button>
    );
};

export default BackButton;
