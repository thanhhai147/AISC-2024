import React from 'react';
import '../assets/css/recentlyActiveBox.css';

const RecentlyActiveBox = () => {
    return (
        <div className='box-recently-active-container '>
            <h className='font-family-semibold primary-color box-recently-active-input-text'>
              Hoạt động gần đây
            </h>
            <div className='box-recently-active-noti-container'>
              <h className='font-family-regular box-recently-active-noti-input-text'>
                Không có hoạt động
              </h>
            </div>
        </div>
    );
  };
  
export default RecentlyActiveBox;