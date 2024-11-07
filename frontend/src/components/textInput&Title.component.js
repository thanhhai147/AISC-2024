import React from "react";
import '../assets/css/textInput&Title.css';
import TextInput from "./textInput.component"; 

export default function TextInputTitle({
    title = '',
    placeholder = '',
}) {

    return (
        <div className="text-input-title-container">

            {title && <lable className="title font-family-semibold">{title}</lable>}

            <div className="text-input-title">
                <TextInput
                    placeholder={placeholder}
                />
            </div>
        </div>
    );
}



