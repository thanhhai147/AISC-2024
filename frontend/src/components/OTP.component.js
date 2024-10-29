import React, { useState } from 'react';
import '../assets/css/OTP.css';
import Button from './button.component';
import OtpInput from 'react-otp-input';
import Countdown from "react-countdown";



const OTP = () => {
    // const [isHovered, setIsHovered] = useState(false);
    // const [isFocused, setIsFocused] = useState(false);
    const [otp, setOtp] = useState('');
    const isOtpComplete = otp.length === 6;
    const [countdownTime, setCountdownTime] = useState(Date.now() + 60000);

    const renderer = ({ minutes, seconds, completed }) => {
        if (completed) {
          return <span>Hết giờ</span>;
        } else {
          return (
            <span>
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
          );
        }
    };
    return (
        <div className={`otp-container`}>
            <input
                type='text'
                className={`otp-input-text font-family-semibold`}
                value='Mã OTP'
            />
            <div className={`otp-input-timer-container`}>
                <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span> </span>}
                    renderInput={(props) => <input {...props} />}
                    containerStyle="otp-input-container"
                    inputStyle="otp-input"  
                />
                <Countdown date={countdownTime} renderer={renderer}/>
            </div>
            

            <Button type='primary' size='large' status={`${isOtpComplete ? 'active' : 'disabled'}`}>Tiếp tục</Button>
            <a href="/"
                className={`otp-input-link-text font-family-regular`}>
                Trở về trang chủ
            </a>
                
        </div>
    );
  };
  
export default OTP;