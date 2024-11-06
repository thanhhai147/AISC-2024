import React from 'react';
import '../assets/css/link.css';

export default function Link({ 
    href = '#', 
    textDecoration = 'none',
    children 
}) {

    return (
        <a 
            href={href} 
<<<<<<< HEAD
            className='link font-family-regular'
=======
            className={`link ${isHovered ? 'hover' : ''} ${isActive ? 'active' : ''} font-family-regular`} 
>>>>>>> main
            style={{ textDecoration }}
        >
            {children}
        </a>
    );
}
