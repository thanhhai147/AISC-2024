import React, { useState } from "react";
import '../assets/css/textInput.css';

export default function TextInput({
    placeholder = '',
    type = 'text',
    value = '',
    width = '',
    onChange
}) {
    
    const [isHovered, setisHovered] = useState(false);
    const [name, setName] = useState('');
  
    const handleMouseEnter = () => setisHovered(true);
    const handleMouseLeave = () => setisHovered(false);

    return (
        <div className="text-input-container">
            <input
                type={type}
                value={value}
                placeholder={placeholder}
                style={{width}}
                onChange={onChange}
                className={`text-input ${isHovered ? 'hover' : ''}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            />
        </div>
    );
}


