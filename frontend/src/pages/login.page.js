import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; 
import '../assets/css/login.page.css';

import UserAPI from "../api/user.api";
import { useAuth } from "../context/authentication.context";

import InputFormNormal from "../components/inputFormNormal.component";
import InputFormPassWord from "../components/inputFormPassword.component";
import imgLoginPage from "../assets/img/login.png";
import GoogleLoginButton from '../components/buttonLoginGoogle.component';
import CheckBoxWithText from '../components/checkBoxWithText.component';
import Button from "../components/button.component";
import Link from "../components/link.component"; 

export default function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth()
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleLogin = () => {

        UserAPI.login(emailOrPhone, password)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                login(data?.data?.user_id)

                setEmailError(false);
                setPasswordError(false);

                Swal.fire({
                    icon: 'success',
                    title: 'Đăng nhập thành công!',
                    text: 'Chúc mừng bạn đã đăng nhập thành công.',
                    confirmButtonText: 'OK',
                }).then(() => {
                    navigate('/'); 
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Đăng nhập thất bại!',
                    text: data.message,
                    confirmButtonText: 'OK',
                })
            }
        })
        .catch(error => {
            throw error
        })

    };

    const handleNavigation = (action) => {
        switch (action) {
            case 'register':
                navigate("/registration")
                break;
            default:
                break;
        }
    };
    
    return (
        <div className='login-page-container'>
            <div className="login-left">
                <img src={imgLoginPage} alt='Login Illustration' className='login-image' />
            </div>
                
            <div className="login-right">
                <p className="title_login font-family-semibold">Đăng nhập</p>
                
                <InputFormNormal 
                    placeholder="Email hoặc số điện thoại"
                    value={emailOrPhone} 
                    onChange={(e) => {
                        const inputValue = e.target.value;
                        setEmailOrPhone(inputValue);

                        if (inputValue.trim()) {
                            setEmailError(false);
                        }
                    }}
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

                <div className="options-Row">
                    <CheckBoxWithText text="Lưu mật khẩu" />
                    {/* <Link 
                        textDecoration="none" 
                        onClick={() => handleNavigation('forgotPassword')}
                    >
                        Quên mật khẩu?
                    </Link> */}
                </div>
                
                <Button 
                    type="primary" 
                    size="large" 
                    status="active" 
                    onClick={handleLogin}
                >
                    Đăng nhập
                </Button>
                
                <div className="register-options font-family-regular">
                    <p className="no-account-text">Bạn chưa có tài khoản?</p>
                    <p
                        className="register-link"
                        onClick={() => handleNavigation('register')}
                    >
                        Đăng ký
                    </p>
                </div>
                {/* <p className='loginWithGg' style={{ color: '#000', opacity: 1 }}>Hoặc</p>
                
                <GoogleLoginButton /> */}
            </div>
        </div>
    );
}
