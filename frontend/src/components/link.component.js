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
            className='link font-family-regular'
            style={{ textDecoration }}
        >
            {children}
        </a>
    );
}
