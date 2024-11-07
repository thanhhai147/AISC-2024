import React, { useState } from 'react';
import '../assets/css/link.css';

export default function Link({ 
    href = '#', 
    label = '', 
    textDecoration = 'none' 
}) {
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    const handleMouseDown = () => setIsActive(true);
    const handleMouseUp = () => setIsActive(false);

    return (
        <a 
            href={href} 
            className={`link ${isHovered ? 'hover' : ''} ${isActive ? 'active' : ''} font-family-regular`} 
            style={{ textDecoration }}
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            {label}
        </a>
    );
}
