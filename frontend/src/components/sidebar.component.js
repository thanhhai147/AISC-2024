import React, { useState, useEffect } from 'react'
import '../assets/css/sidebar.css'

import homeIcon from '../assets/img/home.svg'
import homeBlueIcon from '../assets/img/home-blue.svg'
import bookIcon from '../assets/img/book.svg'
import bookBlueIcon from '../assets/img/book-blue.svg'
import clockIcon from '../assets/img/clock.svg'
import clockBlueIcon from '../assets/img/clock-blue.svg'
import accountIcon from '../assets/img/account.svg'
import accountBlueIcon from '../assets/img/account-blue.svg'
import settingsIcon from  '../assets/img/settings.svg'
import settingsBlueIcon from '../assets/img/settings-blue.svg' 
import forumIcon from  '../assets/img/forum.svg'
import forumBlueIcon from '../assets/img/forum-blue.svg' 
import listIcon from '../assets/img/list.svg'
import listBlueIcon from '../assets/img/list-blue.svg'

const clickToNavigate = (type) => {

    switch (type) {
        case 'home':
            window.location.assign('/')
            break;
        case 'exam':
            window.location.assign('/exam')
            break;
        case 'history':
            window.location.assign('/history')
            break;
        case 'account':
            window.location.assign('/account')
            break;
        case 'settings':
            window.location.assign('/statistics')
            break;
        case 'forum':
            window.location.assign('/forum')
            break;
        case 'question-bank':
            window.location.assign('/question-bank')
            break;    
        default:
            window.location.assign('/')
            break;
    }
}

const sidebarItem = (name, type='home', mode='default', onMouseEnter, onMouseLeave) => {

    let icon = null
    switch (type) {
        case 'home':
            icon = mode !== 'default' ? homeBlueIcon : homeIcon
            break;
        case 'exam':
            icon = mode !== 'default' ? bookBlueIcon : bookIcon
            break;
        case 'history':
            icon = mode !== 'default' ? clockBlueIcon : clockIcon
            break;
        case 'account':
            icon = mode !== 'default' ? accountBlueIcon : accountIcon
            break;
        case 'settings':
            icon = mode !== 'default' ? settingsBlueIcon : settingsIcon
            break;
        case 'forum':
            icon = mode !== 'default' ? forumBlueIcon : forumIcon
            break;
        case 'question-bank':
            icon = mode !== 'default' ? listBlueIcon : listIcon
            break;
        default:
            icon = mode !== 'default' ? homeBlueIcon : homeIcon
            break;
    }

    return (
        <>
            <div 
                className='sidebar-item d-flex flex-row align-items-center' 
                onClick={() => clickToNavigate(type)} 
                onMouseEnter={() => onMouseEnter(type)} 
                onMouseLeave={() => onMouseLeave(type)}
            >
                <div className='sidebar-item-icon'>
                    <img src={icon} alt='sidebar-item-con' />
                </div>
                <div className={`sidebar-item-name font-family-regular ${mode !== 'default' ? 'primary-color' : ''}`}>{name}</div>
            </div>
        </>
    )
}

export default function Sidebar() {
    const [selected, setSelected] = useState({
        'home': false,
        'exam': false,
        'history': false,
        'account': false,
        'settings': false,
        'forum': false
    })

    const [hover, setHover] = useState({
        'home': false,
        'exam': false,
        'history': false,
        'account': false,
        'settings': false,
        'forum': false
    })

    useEffect(() => {
        switch(window.location.pathname) {
            case '/':
                setSelected({
                    'home': true,
                    'exam': false,
                    'history': false,
                    'account': false,
                    'settings': false,
                    'forum': false
                })
                break;
            case '/question':
                setSelected({
                    'home': true,
                    'exam': false,
                    'history': false,
                    'account': false,
                    'settings': false,
                    'forum': false
                })
                break;
            case '/take-exam':
                setSelected({
                    'home': false,
                    'exam': true,
                    'history': false,
                    'account': false,
                    'settings': false,
                    'forum': false
                })
                break;
            case '/exam':
                setSelected({
                    'home': false,
                    'exam': true,
                    'history': false,
                    'account': false,
                    'settings': false,
                    'forum': false
                })
                break;
            case '/exam-detail':
                setSelected({
                    'home': false,
                    'exam': true,
                    'history': false,
                    'account': false,
                    'settings': false,
                    'forum': false
                })
                break;
            case '/history':
                setSelected({
                    'home': false,
                    'exam': false,
                    'history': true,
                    'account': false,
                    'settings': false,
                    'forum': false
                })
                break;
            case '/history-detail':
                setSelected({
                    'home': false,
                    'exam': false,
                    'history': true,
                    'account': false,
                    'settings': false,
                    'forum': false
                })
                break;
            case '/account':
                setSelected({
                    'home': false,
                    'exam': false,
                    'history': false,
                    'account': true,
                    'settings': false,
                    'forum': false
                })
                break;
            case '/statistics':
                setSelected({
                    'home': false,
                    'exam': false,
                    'history': false,
                    'account': false,
                    'settings': true,
                    'forum': false
                })
                break;
            case '/forum':
                setSelected({
                    'home': false,
                    'exam': false,
                    'history': false,
                    'account': false,
                    'settings': false,
                    'forum': true
                })
                break;
            case '/question-bank':
            setSelected({
                'home': false,
                'exam': false,
                'history': false,
                'account': false,
                'settings': false,
                'forum': false,
                'question-bank':true
            })
            break;
        }
    }, [window.location.pathname])

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
            <div className='sidebar col-2 foreground-color'>
                <div className='sidebar-item-list d-flex flex-column align-items-center'>
                    {sidebarItem('Trang chủ', 'home', selected['home'] || hover['home'] ? 'selected' : 'default', handleMouseEnter, handleMouseLeave)}
                    {sidebarItem('Diễn đàn', 'forum', selected['forum'] || hover['forum'] ? 'selected' : 'default', handleMouseEnter, handleMouseLeave)}
                    {sidebarItem('Bộ câu hỏi', 'question-bank', selected['question-bank'] || hover['question-bank'] ? 'selected' : 'default', handleMouseEnter, handleMouseLeave)}
                    {sidebarItem('Đề ôn', 'exam', selected['exam'] || hover['exam'] ? 'selected' : 'default', handleMouseEnter, handleMouseLeave)}
                    {sidebarItem('Lịch sử', 'history', selected['history'] || hover['history'] ? 'selected' : 'default', handleMouseEnter, handleMouseLeave)}
                    {sidebarItem('Tài khoản', 'account', selected['account'] || hover['account'] ? 'selected' : 'default', handleMouseEnter, handleMouseLeave)}
                    {sidebarItem('Thống kê', 'settings', selected['settings'] || hover['settings'] ? 'selected' : 'default', handleMouseEnter, handleMouseLeave)}
                </div>
            </div>
        </>
    )
}