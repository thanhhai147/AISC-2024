import React, { useState, useEffect } from 'react'
import '../assets/css/navbarQuestion.css'

import Button from './button.component.js'

export default function NavbarQuestion() {

    const [chosenQuestion, setChosenQuestion] = useState(0)

    return (
        <>
            <div className='navbar-question'>
                <div className='navbar-question-title-container'>
                    <div className='navbar-question-title font-family-semibold'>Danh sách câu hỏi</div>
                </div>
                <div className='navbar-question-label-container'>
                    <div className='navbar-question-label-wrapper'>
                        <Button type='secondary' size='small'>Tất cả câu hỏi</Button>
                        <Button type='secondary' size='small'>Danh sách câu hỏi đã chọn</Button>
                        <Button type='secondary' size='small'>Đã chỉnh sửa</Button>
                        <Button type='secondary' size='small'>Đã xóa</Button>
                        <Button type='secondary' size='small'>({chosenQuestion})Đã chọn</Button>
                    </div>
                    <hr className='navbar-question-line' />
                </div>
            </div>
        </>
    )
}