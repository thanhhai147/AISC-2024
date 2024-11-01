import React from "react";
import '../assets/css/textInput&Label.css';
import TextInput from "./textInput.component";

export default function TextInputLabel({
    label = '',
    placeholder = '',
}) {

    return (
        <div className="label-text-input-title">

            {label && <label className="text-input-label">{label}</label>}

            <div className="text-input-container">
                <TextInput
                    placeholder={placeholder}
                />
            </div>
        </div>
    );
}


