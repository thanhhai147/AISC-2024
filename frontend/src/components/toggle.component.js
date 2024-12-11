import '../assets/css/toggle.css';
import { Switch, ConfigProvider } from "antd";
import React, { useState } from 'react';

function Toggle({ checked, onChange }) {
    
    // const [checked, setChecked] = useState(false);

    // const handleChange = (value) => {
    //     setChecked(value);
    //     console.log(value); // Hiển thị trạng thái mới trong console
    // };
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
                checked={checked} // Đồng bộ giá trị với state
                onChange={onChange} // Xử lý sự kiện khi click
            />
            </div>
        </ConfigProvider>
        
    );
}
export default Toggle;
