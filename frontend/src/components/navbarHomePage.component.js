import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../assets/css/navbarHomePage.css';
import SearchBar from './searchbar.component';
import IconPremium from './iconPremium.component';
import Button from './button.component';
import logoIcon from '../assets/img/logo.svg'
import ListItems from './listItems.component';

import { useNotification } from '../context/notification.context';

const NavbarHomePage = () => {
    const navigate = useNavigate()
    const [selected, setSelected] = useState({
        'noti': false,
        'login': false,
    })
    const [hover, setHover] = useState({
        'noti': false,
        'login': false,
    })
    const { notification } = useNotification()

    const handleClick = (type) => {
        setSelected((prevSelected) => ({
            ...prevSelected,
            [type]: !selected[type],
        }))
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
                {/* <SearchBar/> */}
                <IconPremium onClick={() => navigate("/premium")} />
                <Button 
                    type='secondary' 
                    size='large' 
                    status={(selected['noti'] || hover['noti']) ? 'disabled' : 'active'}
                    onClick={() => handleClick('noti')}
                    onMouseEnter={() => handleMouseEnter('noti')}
                    onMouseLeave={() => handleMouseLeave('noti')}
                >
                    Thông báo
                </Button>
                {
                    selected['noti'] ? 
                    <div className='noti-results-container'>
                        <ListItems 
                            results={notification}
                            emptyMessage='Không có thông báo.'
                        />
                    </div>
                    : null
                }
                <Button 
                    type='secondary' 
                    size='large' 
                    status={(selected['login'] || hover['login']) ? 'disabled' : 'active'}
                    onClick={() => {
                        handleClick("click")
                        navigate("/login")
                    }}
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