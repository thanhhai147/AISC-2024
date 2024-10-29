import React from "react";
import "../assets/css/textInput.css"

export default function TextInput({ placeholder="", defaultValue="", uneditable=null, boldText=false, setCallBackValue=()=>{} }) {
    return (
        <div 
            className={
                `
                    text-input-wrapper
                    ${boldText ? 'font-family-semibold' : 'font-family-regular'}
                `
            } 
            tabIndex="0"
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
                className='text-input'
                type="text"
                defaultValue={defaultValue}
                placeholder={placeholder}
                onChange={e => {
                    setCallBackValue(e.target.value)
                }}
                size={(defaultValue.length)}
            />
        </div>
    )
}