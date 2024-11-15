import React, { useState } from 'react';
import '../assets/css/iconPremium.css';
import { Icon } from '@iconify/react';


const IconPremium = ({ onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Icon   
            icon="basil:diamond-solid" 
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
            className={`icon-premium  ${isHovered ? 'icon-premium-hover' : 'primary-color'}`}
        />

    );
  };
  
  export default IconPremium;