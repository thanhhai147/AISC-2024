import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; 
import '../assets/css/registration.css';
import InputFormNormal from "../components/inputFormNormal.component";
import InputFormPassWord from "../components/inputFormPassword.component";
import imgLoginPage from "../assets/img/login.png";
import GoogleLoginButton from '../components/buttonLoginGoogle.component';
import CheckBoxWithText from '../components/checkBoxWithText.component';
import Button from "../components/button.component";

export default function RegistrationPage() {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [fullNameError, setFullNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleNavigation = (action) => {
        switch (action) {
            case 'login':
                navigate('/login');
                break;
            default:
                break;
        }
    };

    const handleRegistration = () => {
        setFullNameError(false);
        setEmailError(false);
        setPasswordError(false);

        Swal.fire({
            icon: 'success',
            title: 'Đăng ký thành công!',
            text: 'Chúc mừng bạn đã đăng ký thành công.',
            confirmButtonText: 'OK',
        }).then(() => {
            navigate('/'); 
        });
    };

    return (
        <div className='registration-page-container'>
            <div className="register-left">
                <img src={imgLoginPage} alt='Login Illustration' className='register-image' />
            </div>
                
            <div className="register-right">
                <p className="title_register font-family-semibold">Đăng ký</p>
                <div className="input_name">
                    <InputFormNormal 
                        className="input-field-name"
                        placeholder="Họ và tên"
                        value={fullName} 
                        onChange={(e) => setFullName(e.target.value)}
                        error={fullNameError} 
                        errorMessage="Vui lòng nhập họ và tên."
                    />
                </div>

                <InputFormNormal 
                    placeholder="Email hoặc số điện thoại"
                    value={emailOrPhone} 
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    error={emailError} 
                    errorMessage="Vui lòng nhập email hoặc số điện thoại."
                />

                <InputFormPassWord
                    label=" "
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordError(false);
                    }}
                    error={passwordError}
                    errorMessage="Vui lòng nhập mật khẩu."
                />

                <div className="options-row">
                    <CheckBoxWithText text="Tôi đồng ý với Điều Khoản Sử Dụng và Chính Sách Bảo Mật của EduVision" />
                </div>
                
                <Button 
                    type="primary" 
                    size="large" 
                    status="active"
                    onClick={handleRegistration}
                >
                    Đăng ký
                </Button>
                
                <div className="login-options font-family-regular">
                    <p className="no-account-text">Bạn đã có tài khoản? </p>
                    <p
                        className="login-link"
                        onClick={() => handleNavigation('login')}
                    >
                        Đăng nhập
                    </p>
                </div>
                <p className='registerWithGg' style={{ color: '#000', opacity: 1 }}>Hoặc</p>
                
                <GoogleLoginButton />
            </div>
        </div>
    );
}
