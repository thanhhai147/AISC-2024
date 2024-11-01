import React, { useState } from "react";
import '../assets/css/inputFormPassword.css';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

export default function InputFormPassWord({
    label = '',
    placeholder = '',
    defaultValue = '',
    width = '40%',
    boxShadow = '',
    onChange=()=>{}
}) {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

    return (
       
        <div className="input-form-password-wraper" style={{ width }}>
            {label && <label className="input-form-password-label font-family-extrabold">{label}</label>}
            <div className="input-form-password-container" style={{ width }}>
                <input
                    type={isPasswordVisible ? "text" : "password"}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    style={{ boxShadow }}
                    onChange={onChange}
                    className="input-form-password font-family-regular"
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
