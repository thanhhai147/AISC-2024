import React, { useState } from "react";
import '../assets/css/textInput&Label.css';

export default function TextInputLabel({
    label = '',
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
        <div className="label-text-input-title">

            {label && <label className="text-input-label">{label}</label>}

            <div className="text-input-container">
                <input
                    type={type}
                    value={value} // Dùng value từ props để input có thể được điều khiển từ bên ngoài
                    placeholder={placeholder}
                    style={{ width, boxShadow }} 
                    onChange={onChange} // Truyền trực tiếp hàm `onChange` để quản lý giá trị từ bên ngoài
                    className={`text-input ${isHovered ? 'hover' : ''}`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                />
            </div>
        </div>
    );
}


