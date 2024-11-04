import React, { useState } from 'react';
import '../assets/css/radioButton.css'
const RadioButtonGroup = ({ options, name }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionChange = (value) => {
        setSelectedOption(value);
    };

    return (
        <div className="radio-button-group">
            {options.map((option) => (
                <div
                    key={option.value}
                    className="radio-button-wrapper"
                    onClick={() => handleOptionChange(option.value)}
                >
                    <div className={`radio-button ${selectedOption === option.value ? 'selected' : ''}`}></div>
                    <span className="radio-button-label">{option.label}</span>
                </div>
            ))}
        </div>
    );
};

export default RadioButtonGroup;
