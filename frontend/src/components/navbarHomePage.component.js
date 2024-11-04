import React, { useState } from 'react';
import '../assets/css/navbarHomePage.css';
import SearchBar from './searchbar.component';
import IconPremium from './iconPremium.component';
import Button from './button.component';
import logoIcon from '../assets/img/logo.svg'

const NavbarHomePage = () => {
    const [selected, setSelected] = useState({
        'noti': false,
        'login': false,
    })
    const [hover, setHover] = useState({
        'noti': false,
        'login': false,
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
    return (
        <div className='navbar-homepage-container foreground-color'>
            <img src={logoIcon} className='logo-icon'/>
            <div className='navbar-homepage-header'>
                <SearchBar/>
                <IconPremium/>
                <Button 
                    type='secondary' 
                    size='large' 
                    status={selected['noti'] || hover['noti'] ? 'active' : 'disabled'}
                    onClick={() => handleClick('noti')}
                    onMouseEnter={() => handleMouseEnter('noti')}
                    onMouseLeave={() => handleMouseLeave('noti')}
                >
                    Thông báo
                </Button>
                <Button 
                    type='secondary' 
                    size='large' 
                    status={selected['login'] || hover['login'] ? 'active' : 'disabled'}
                    onClick={() => handleClick('login')}
                    onMouseEnter={() => handleMouseEnter('login')}
                    onMouseLeave={() => handleMouseLeave('login')}
                >
                    Đăng nhập
                </Button>
            </div>
        </div>
    );
  };
  
export default NavbarHomePage;