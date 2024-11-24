import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/navbarAnswerDetail.css';
import BackButton from './buttonBack.component';

const NavbarAnswerDetail = ({ examName = 'No exam name provided' }) => { 
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/');
    };

    return (
        <div className='navbar-answer-container foreground-color'>
            <BackButton onClick={handleBackClick} aria-label="Go Back"></BackButton> 
            <p className='exam-name font-family-semibold'>{examName}</p>
        </div>
    );
};

export default NavbarAnswerDetail;
