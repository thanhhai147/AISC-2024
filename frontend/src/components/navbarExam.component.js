import React, { useState } from 'react';
import '../assets/css/navbarExam.css';
import Button from './button.component';
import BackButton from './buttonBack.component';

const NavbarExam = () => {
    return (
        <div className='navbar-exam-container foreground-color'>
            <BackButton/>
            <Button 
                type='secondary' 
                size='large' 
                status={'disabled'}
            >
                Tên người thực hiện: Nguyễn Hải Đăng
            </Button>
            <Button 
                type='success' 
                size='large' 
                status={'active'}
            >
                Nộp bài
            </Button>
        </div>
    );
  };
  
export default NavbarExam;