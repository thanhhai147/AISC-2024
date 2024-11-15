import React from 'react';
import '../assets/css/infoAccount.css';
import Link from './link.component';

export default function InforAccount({ 
    title = '', 
    value = '',
    icon: IconComponent,
    type = 'text' 
}) {
    // If type is 'password', replace each character in value with a dot or asterisk
    const displayValue = type === 'password' ? '•'.repeat(value.length) : value || 'Chưa có thông tin';

    return (
        <span className='infor-account-container font-family-regular'>
            <span className='title-container'>
                {IconComponent && <IconComponent className="icon" />}
                <p>{title}</p>
            </span>
            <span className='value-container'>{displayValue}</span>
            <span className='link-container'>
                <Link href='#'>{value ? 'Chỉnh sửa' : 'Thêm'}</Link>
            </span>
        </span>
    );
}
