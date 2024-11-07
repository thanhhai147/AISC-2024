import '../assets/css/toggle.css';
import { Switch, ConfigProvider } from "antd";
import React, { useState } from 'react';

function Toggle() {
    
    const [checked, setChecked] = useState(false);

    const handleChange = (checked) => {
        setChecked(checked);
    };
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#06AB66', 
                    colorPrimaryBorder: '#06AB66',
                    colorPrimaryHover: '#06AB66'
                },
            }}
        >
            <div className='toggle'>
            <Switch 
                className={`custom-switch`}
                onChange={handleChange} 
            />
            </div>
        </ConfigProvider>
        
    );
}
export default Toggle;
