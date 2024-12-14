import React, {useState} from "react";
import '../assets/css/textInput&Title.css';
import TextInput from "./textInput.component"; 

export default function TextInputTitle({
    title = '',
    placeholder = '',
    value = '', 
    onChange=()=>{},
    ...rest
}) {
    return (
        <div className="text-input-title-container">

            {title && <label className="title font-family-semibold">{title}</label>}

            <div className="text-input-title">
                <TextInput
                    placeholder={placeholder}
                    // value={value} // Truyền giá trị vào input
                    onChange={onChange} 
                />
            </div>
        </div>
    );
}



