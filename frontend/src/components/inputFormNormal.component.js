import React from "react";
import '../assets/css/inputFormNormal.css';
import InputFormPassWord from "./inputFormPassword.component";

export default function InputFormNormal({
    label = '',
    placeholder = '',
    error = false,
    errorMessage=''
}) {


    return (
       
        <div className="input-form-normal-wraper">
            <div className="input-form-normal-container">
                <InputFormPassWord 
                label={label}
                placeholder={placeholder}
                error={error}
                errorMessage={errorMessage}
                />
            </div>
        </div>
        
        
    );
}
