import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/navbarExam.css';
import Button from './button.component';
import BackButton from './buttonBack.component';
import Clock from './clock.component';
import ExamAPI from '../api/exam.api';

const NavbarExam = ({initialTime = 1, userId, quizId, userAnswers}) => {
    const navigate = useNavigate(); 

    const handleBackClick = () => {
        navigate(-1); 
    };

    const handleSubmitClick = async() => {
        console.log(userId, quizId, userAnswers)

        try {
            // Gọi API để cập nhật bài thi
            const response = await ExamAPI.updateQuizAttempt(userId, quizId, userAnswers);
            const data = await response.json();
            if (response.ok) {
                console.log('Quiz attempt updated successfully');
                navigate('/scoring?attempted_id=' + data.attempt_id); // Điều hướng đến trang kết quả
            } else {
                console.error('Failed to update quiz attempt');
            }
        } catch (error) {
            console.error('Error updating quiz attempt:', error);
        }
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
            <Clock
                initialTime={initialTime}>
            </Clock>
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