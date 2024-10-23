import React, { useState } from 'react'
import '../assets/css/navbarQuestion.css'

import Button from './button.component.js'

export default function NavbarQuestion() {
    const [selected, setSelected] = useState({
        'all': false,
        'chosenList': false,
        'edit': false,
        'delete': false,
        'chosen': false
    })
    const [hover, setHover] = useState({
        'all': false,
        'chosenList': false,
        'edit': false,
        'delete': false,
        'chosen': false
    })
    const [chosenQuestion, setChosenQuestion] = useState(0)

    const handleClick = (type) => {
        let newSelected = selected
        Object.keys(selected).forEach(key => {
            if (key === type) newSelected[key] = true
            else newSelected[key] = false
        })
        setSelected(newSelected)
    }

    const handleMouseEnter = (type) => {
        setHover((prevHover) => ({
            ...prevHover,
            [type]: true,
        }))
    }

    const handleMouseLeave = (type) => {
        setHover((prevHover) => ({
            ...prevHover,
            [type]: false,
        }))
    }

    return (
        <>
            <div className='navbar-question'>
                <div className='navbar-question-title-container'>
                    <div className='navbar-question-title font-family-semibold'>Danh sách câu hỏi</div>
                </div>
                <div className='navbar-question-label-container'>
                    <div className='navbar-question-label-wrapper'>
                        <Button
                            type='secondary'
                            size='small'
                            status={selected['all'] || hover['all'] ? 'active' : 'disabled'}
                            onClick={() => handleClick('all')}
                            onMouseEnter={() => handleMouseEnter('all')}
                            onMouseLeave={() => handleMouseLeave('all')}
                        >
                            Tất cả câu hỏi
                        </Button>
                        <Button
                            type='secondary'
                            size='small'
                            status={selected['chosenList'] || hover['chosenList'] ? 'active' : 'disabled'}
                            onClick={() => handleClick('chosenList')}
                            onMouseEnter={() => handleMouseEnter('chosenList')}
                            onMouseLeave={() => handleMouseLeave('chosenList')}
                        >
                            Danh sách câu hỏi đã chọn
                        </Button>
                        <Button 
                            type='secondary' 
                            size='small' 
                            status={selected['edit'] || hover['edit'] ? 'active' : 'disabled'} 
                            onClick={() => handleClick('edit')}
                            onMouseEnter={() => handleMouseEnter('edit')}
                            onMouseLeave={() => handleMouseLeave('edit')}
                        >
                            Đã chỉnh sửa
                        </Button>
                        <Button 
                            type='secondary' 
                            size='small' 
                            status={selected['delete'] || hover['delete'] ? 'active' : 'disabled'} 
                            onClick={() => handleClick('delete')}
                            onMouseEnter={() => handleMouseEnter('delete')}
                            onMouseLeave={() => handleMouseLeave('delete')}
                        >
                            Đã xóa
                        </Button>
                        <Button 
                            type='secondary' 
                            size='small' 
                            status={selected['chosen'] || hover['chosen'] ? 'active' : 'disabled'} 
                            onClick={() => handleClick('chosen')}
                            onMouseEnter={() => handleMouseEnter('chosen')}
                            onMouseLeave={() => handleMouseLeave('chosen')}
                        >
                            ({chosenQuestion})Đã chọn
                        </Button>
                    </div>
                    <hr className='navbar-question-line' />
                </div>
            </div>
        </>
    )
}