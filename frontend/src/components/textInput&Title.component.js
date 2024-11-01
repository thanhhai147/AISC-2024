import React from "react";
import '../assets/css/textInput&Title.css';
import TextInput from "./textInput.component"; 

export default function TextInputTitle({
    title = '',
    placeholder = '',
}) {

    return (
        <div className="title-text-input">

            {title && <lable className="title font-family-regular">{title}</lable>}

            <div className="text-input-container">
                <TextInput
                    placeholder={placeholder}
                />
            </div>
        </div>
    );
}



