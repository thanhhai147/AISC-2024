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

            {title && <lable className="title font-family-semibold">{title}</lable>}

            <div className="text-input-title">
                <TextInput
                    placeholder={placeholder}
                    value={value} // Truyền giá trị vào input
                    onChange={onChange} 
                />
            </div>
        </div>
    );
}



