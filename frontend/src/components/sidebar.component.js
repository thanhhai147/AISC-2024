import React, { useState, useEffect } from 'react'
import '../assets/css/sidebar.css'

import homeIcon from '../assets/img/home.png'
import homeBlueIcon from '../assets/img/home-blue.png'
import bookIcon from '../assets/img/book.png'
import bookBlueIcon from '../assets/img/book-blue.png'
import clockIcon from '../assets/img/clock.png'
import clockBlueIcon from '../assets/img/clock-blue.png'
import accountIcon from '../assets/img/account.png'
import accountBlueIcon from '../assets/img/account-blue.png'
import settingsIcon from  '../assets/img/settings.png'
import settingsBlueIcon from '../assets/img/settings-blue.png' 

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

export default function Sidebar() {
    const [selected, setSelected] = useState({
        'home': false,
        'exam': false,
        'history': false,
        'account': false,
        'settings': false
    })

    useEffect(() => {
        switch(window.location.pathname) {
            case '/':
                setSelected({
                    'home': true,
                    'exam': false,
                    'history': false,
                    'account': false,
                    'settings': false
                })
                break;
            case '/question':
                setSelected({
                    'home': true,
                    'exam': false,
                    'history': false,
                    'account': false,
                    'settings': false
                })
                break;
            case '/take-exam':
                setSelected({
                    'home': false,
                    'exam': true,
                    'history': false,
                    'account': false,
                    'settings': false
                })
                break;
            case '/exam':
                setSelected({
                    'home': false,
                    'exam': true,
                    'history': false,
                    'account': false,
                    'settings': false
                })
                break;
            case '/exam-detail':
                setSelected({
                    'home': false,
                    'exam': true,
                    'history': false,
                    'account': false,
                    'settings': false
                })
                break;
            case '/history':
                setSelected({
                    'home': false,
                    'exam': false,
                    'history': true,
                    'account': false,
                    'settings': false
                })
                break;
            case '/history-detail':
                setSelected({
                    'home': false,
                    'exam': false,
                    'history': true,
                    'account': false,
                    'settings': false
                })
                break;
            case '/account':
                setSelected({
                    'home': false,
                    'exam': false,
                    'history': false,
                    'account': true,
                    'settings': false
                })
                break;
            case '/statistics':
                setSelected({
                    'home': false,
                    'exam': false,
                    'history': false,
                    'account': true,
                    'settings': false
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
                        selected['settins'] ? settingsItemSelected : settingsItem
                    }
                </div>
            </div>
        </>
    )
}