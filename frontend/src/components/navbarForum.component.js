import React, { useState } from 'react';
import '../assets/css/navbarForum.css';

import Button from './button.component.js';

export default function NavbarForum({ onNavItemClick }) {
    const [selected, setSelected] = useState({
        all: false,
        chosenList: false,
        edit: false,
    });

    const handleClick = (type) => {
        setSelected((prev) => {
            const newSelected = { all: false, chosenList: false, edit: false };
            newSelected[type] = true;
            return newSelected;
        });
        onNavItemClick(type);
    };

    return (
        <div className='navbar-forum'>
            <div className='navbar-forum-title-container'>
                <div className='navbar-forum-title font-family-semibold'>Danh sách câu hỏi</div>
            </div>
            <div className='navbar-forum-label-container'>
                <div className='navbar-forum-label-wrapper'>
                    <Button
                        type='secondary'
                        size='small'
                        status={selected['all'] ? 'active' : 'disabled'}
                        onClick={() => handleClick('all')}
                    >
                        Tất cả bài đăng
                    </Button>
                    <Button
                        type='secondary'
                        size='small'
                        status={selected['chosenList'] ? 'active' : 'disabled'}
                        onClick={() => handleClick('chosenList')}
                    >
                        Tạo bài đăng
                    </Button>
                    <Button
                        type='secondary'
                        size='small'
                        status={selected['edit'] ? 'active' : 'disabled'}
                        onClick={() => handleClick('edit')}
                    >
                        Thông tin nổi bật
                    </Button>
                </div>
                <hr className='navbar-forum-line' />
            </div>
        </div>
    );
}
