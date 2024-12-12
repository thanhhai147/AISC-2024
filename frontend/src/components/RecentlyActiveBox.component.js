import React from 'react';
import '../assets/css/recentlyActiveBox.css';
import Button from './button.component';
import { useNavigate } from 'react-router-dom';

const RecentlyActiveBox = ({ activities=[] }) => {
  const navigate = useNavigate()

  const noActivityItem = () => (
    <p className='font-family-regular box-recently-active-noti-input-text'>
      Không có hoạt động
    </p>
  )

  const activityItem = (item) => (
    <div key={item.title} className='font-family-regular box-recently-activity-item'>
      <div className='activity-title'>
        {item.title}
      </div>
      <div className='activity-time'>
        {new Date(item.time).toLocaleDateString('vi-Vn') + " " + new Date(item.time).toLocaleTimeString('vi-Vn')}
      </div>
      <div className='activity-button'>
        <Button 
          size='small' 
          type='primary'
          onClick={() => navigate(item.navigateTo)} 
        >
          Xem
        </Button>
      </div>
    </div>
  )

  return (
      <div className='box-recently-active-container '>
          <p className='font-family-semibold primary-color box-recently-active-input-text'>
            Hoạt động gần đây
          </p>
          <div className={`box-recently-active-noti-container ${!activities.length ? 'd-flex justify-content-center align-items-center' : ''}`}>
            {
              activities.length ?
              activities.map(item => activityItem(item)) :
              noActivityItem()
            }
          </div>
      </div>
  );
};
  
export default RecentlyActiveBox;