import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/navbarExam.css';
import Button from './button.component';
import BackButton from './buttonBack.component';
import Clock from './clock.component';
const NavbarExam = () => {
    const navigate = useNavigate(); 

    const handleBackClick = () => {
        navigate('/'); 
    };

    const handleSubmitClick = () => {
        navigate('/scoring'); 
    };
    return (
        <div className='navbar-exam-container foreground-color'>
            <BackButton onClick={handleBackClick}></BackButton>
            <Button 
                type='secondary' 
                size='large' 
                status={'disabled'}
            >
                Tên người thực hiện: Nguyễn Hải Đăng
            </Button>
            <Clock/>
            <Button 
                type='success' 
                size='large' 
                status={'active'}
                onClick={handleSubmitClick}
            >
                Nộp bài
            </Button>
        </div>
    );
  };
  
export default NavbarExam;