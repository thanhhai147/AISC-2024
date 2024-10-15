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
        default:
            window.location.assign('/')
            break;
    }
}

const sidebarItem = (name, type='home', mode='default') => {

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
        default:
            icon = mode !== 'default' ? homeBlueIcon : homeIcon
            break;
    }

    return (
        <>
            <div className='sidebar-item d-flex flex-row align-items-center' onClick={() => clickToNavigate(type)}>
                <div className='sidebar-item-icon'>
                    <img src={icon} alt='sidebar-item-con' />
                </div>
                <div className={`sidebar-item-name font-family-regular ${mode !== 'default' ? 'primary-color' : ''}`}>{name}</div>
            </div>
        </>
    )
}

const homeItem = sidebarItem('Trang chủ', 'home', 'default')
const homeItemSelected = sidebarItem('Trang chủ', 'home', 'selected')
const examItem = sidebarItem('Đề ôn', 'exam', 'default')
const examItemSelected = sidebarItem('Đề ôn', 'exam', 'selected')
const historyItem = sidebarItem('Lịch sử', 'history', 'default')
const historyItemSelected = sidebarItem('Lịch sử', 'history', 'selected')
const accountItem = sidebarItem('Tài khoản', 'account', 'default')
const accountItemSelected = sidebarItem('Tài khoản', 'account', 'selected')
const settingsItem = sidebarItem('Thống kê', 'settings', 'default')
const settingsItemSelected = sidebarItem('Thống kê', 'settings', 'selected')
const forumItem = sidebarItem('Diễn đàn', 'forum', 'default')
const forumItemSelected = sidebarItem('Diễn đàn', 'forum', 'selected')

export default function Sidebar() {
    const [selected, setSelected] = useState({
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
        }
    }, [window.location.pathname])

    return (
        <>
            <div className='sidebar col-2 foreground-color'>
                <div className='sidebar-item-list d-flex flex-column align-items-center'>
                    {
                        selected['home'] ? homeItemSelected : homeItem
                    }
                    {
                        selected['exam'] ? examItemSelected : examItem
                    }
                    {
                        selected['history'] ? historyItemSelected : historyItem
                    }
                    {
                        selected['account'] ? accountItemSelected : accountItem
                    }
                    {
                        selected['settings'] ? settingsItemSelected : settingsItem
                    }
                    {
                        selected['forum'] ? forumItemSelected : forumItem
                    }
                </div>
            </div>
        </>
    )
}