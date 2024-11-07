import { Checkbox , ConfigProvider} from 'antd';
import React, { useState } from 'react';

function CheckBox() {
    
    const [checked, setChecked] = useState(false);

    const handleChange = (checked) => {
        setChecked(checked);
    };
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorBorder: '#000',
                    colorPrimary: '#06AB66', 
                    colorPrimaryBorder: '#06AB66',
                    colorPrimaryHover: '#06AB66'
                },
            }}
        >
            <div className='check-box'>
                <Checkbox
                    className={`custom-checkbox`}
                    onChange={handleChange}
                />
            </div>
        </ConfigProvider>
    );
}
export default CheckBox;
