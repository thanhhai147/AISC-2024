import React from 'react';
import Countdown from 'react-countdown';
import { FaRegClock } from "react-icons/fa";
import '../assets/css/clock.css'

const Clock = ({time = 1, onTimeChange}) => {
    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            return <span>Hết giờ</span>;
        } else {
            return (
                <span>
                    {hours.toString().padStart(2, '0')}:
                    {minutes.toString().padStart(2, '0')}:
                    {seconds.toString().padStart(2, '0')}
                </span>
            );
        }
    };
    

    return (
        <div className="countdown-container font-family-semibold">
            <FaRegClock className="clock-icon" />
            <Countdown 
                className="time" 
                date={Date.now() + time * 60 * 1000} 
                renderer={renderer}
                onTick={onTimeChange} 
            /> 
        </div>
    );
};

export default Clock;
