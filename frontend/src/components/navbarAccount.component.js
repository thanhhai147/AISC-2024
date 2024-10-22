import React, { useState } from 'react'
import "../assets/css/navbarAccount.css"

import Button from './button.component.js'

export default function NavbarAccount() {
    const [selected, setSelected] = useState({
        'account': false,
        'changePassword': false,
        'settings': false
    })

    const [hover, setHover] = useState({
        'account': false,
        'changePassword': false,
        'settings': false
    })

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

    return(
        <>
            <div className='navbar-account'>
                <div className='navbar-account-wrapper'>
                    <Button
                        type='secondary'
                        size='large'
                        status={selected['account'] || hover['account'] ? 'active' : 'disabled'}
                        onClick={() => handleClick('account')}
                        onMouseEnter={() => handleMouseEnter('account')}
                        onMouseLeave={() => handleMouseLeave('account')}
                    >
                        Tài khoản
                    </Button>
                    <Button
                        type='secondary'
                        size='large'
                        status={selected['changePassword'] || hover['changePassword'] ? 'active' : 'disabled'}
                        onClick={() => handleClick('changePassword')}
                        onMouseEnter={() => handleMouseEnter('changePassword')}
                        onMouseLeave={() => handleMouseLeave('changePassword')}
                    >
                        Đổi mật khẩu
                    </Button>
                    <Button
                        type='secondary'
                        size='large'
                        status={selected['settings'] || hover['settings'] ? 'active' : 'disabled'}
                        onClick={() => handleClick('settings')}
                        onMouseEnter={() => handleMouseEnter('settings')}
                        onMouseLeave={() => handleMouseLeave('settings')}
                    >
                        Cài đặt khác
                    </Button>
                </div>
                <hr className='navbar-account-line' />
            </div>
        </>
    )
}