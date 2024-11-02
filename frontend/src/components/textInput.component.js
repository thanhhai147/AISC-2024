import React from "react";
import '../assets/css/textInput.css';

export default function TextInput({
    placeholder = '',
    type = 'text',
    defaultValue = '',
    uneditable = '',
    width = '',
    boldText=false,
    onChange=()=>{}
}) {

    return (
        <div 
            className='text-input-wrapper'
        >
            {
                uneditable ? 
                <div
                    className='text-input-uneditable mr-2'
                >
                    {uneditable}
                </div>
                : null
            }
            <input
                type={type}
                defaultValue={defaultValue}
                placeholder={placeholder}
                style={{width}}
                onChange={onChange}
                className={`
                    text-input 
                    ${boldText ? 'font-family-semibold' : 'font-family-regular'}
                `}
                size={(defaultValue.length)}
            />
        </div>
    );
}


