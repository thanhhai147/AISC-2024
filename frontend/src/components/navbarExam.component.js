import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/navbarExam.css';
import Button from './button.component';
import BackButton from './buttonBack.component';
import Clock from './clock.component';
import ExamAPI from '../api/exam.api';
import { useAuth } from '../context/authentication.context';

const NavbarExam = ({time = 1, timeLimit, quizId, userAnswers, onTimeChange}) => {
    const navigate = useNavigate(); 
    const { userId, user } = useAuth()

    const handleBackClick = () => {
        navigate(-1); 
    };

    const timeTaken = timeLimit - time
    const handleSubmitClick = async() => {
        console.log(timeTaken, userId, quizId, userAnswers)
        

        try {
            // Gọi API để cập nhật bài thi
            const response = await ExamAPI.updateQuizAttempt(userId, quizId, timeTaken, userAnswers);
            const data = await response.json();
            if (response.ok) {
                console.log('Quiz attempt updated successfully');
                navigate('/scoring?attempted_id=' + data.attempt_id); // Điều hướng đến trang kết quả
            } else {
                console.error('Failed to update quiz attempt');
                console.log(data)
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
                Tên người thực hiện: { user?.username }
            </Button>
            <Clock
                time={time}
                onTimeChange={onTimeChange}
            >
            </Clock>
            <Button 
                type='success' 
                size='large' 
                status={time > 0 ? 'active' : 'disabled'}
                onClick={handleSubmitClick}
            >
                Nộp bài
            </Button>
        </div>
    );
  };
  
export default NavbarExam;