import React, { useState } from "react";
import '../assets/css/textInput&Title.css';

export default function TextInputTitle({
    title = '',
    placeholder = '',
    type = 'text',
    value = '',
    width = '',
    boxShadow = '',
    onChange
}) {

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    return (
        <div className="title-text-input">

            {title && <lable className="title">{title}</lable>}

            <div className="text-input-container">
                <input
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    style={{ width, boxShadow }} 
                    onChange={onChange} 
                    className={`text-input ${isHovered ? 'hover' : ''}`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                />
            </div>
        </div>
    );
}



