import React, { useState } from "react";
import '../assets/css/inputFormPassword.css';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

export default function InputFormPassWord({
    label = '',
    placeholder = '',
    value = '',
    width = '',
    boxShadow = '',
    onChange
}) {
    const [isHovered, setIsHovered] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

    return (
        <div className="label-text-input" style={{ width }}>
            {label && <label className="text-input-label">{label}</label>}
            <div className="text-input-container" style={{ width }}>
                <input
                    type={isPasswordVisible ? "text" : "password"}
                    value={value}
                    placeholder={placeholder}
                    style={{ boxShadow }}
                    onChange={onChange}
                    className={`text-input ${isHovered ? 'hover' : ''}`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                />
                <span
                    className="toggle-password-icon"
                    onClick={togglePasswordVisibility}
                >
                    {isPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                </span>
            </div>
        </div>
    );
}
