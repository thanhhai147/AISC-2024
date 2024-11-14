import React from 'react';
import '../assets/css/recentlyActiveBox.css';
import Button from './button.component';

const RecentlyActiveBox = ({ activities=[] }) => {

  const noActivityItem = () => (
    <p className='font-family-regular box-recently-active-noti-input-text'>
      Không có hoạt động
    </p>
  )

  const activityItem = (title, time) => (
    <div className='font-family-regular box-recently-activity-item'>
      <div className='activity-title'>
        {title}
      </div>
      <div className='activity-time'>
        {time}
      </div>
      <div className='activity-button'>
        <Button size='small' type='primary'>
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
          <div className={`box-recently-active-noti-container ${!activities.length ? 'align-items-center' : ''}`}>
            {
              activities.length ?
              activities.map(item => activityItem(item['title'], item['time'])) :
              noActivityItem()
            }
          </div>
      </div>
  );
};
  
export default RecentlyActiveBox;