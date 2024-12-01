import React, { useState } from 'react';
import Swal from 'sweetalert2';
import '../assets/css/postReport.css';
import Button from './button.component';

const PostReport = () => {
    const [reportAnswer, setReportAnswer] = useState(null); 

    const handleAnswerClick = (answer) => {
        setReportAnswer(answer);
        Swal.fire({
            icon: 'success',
            title: 'Báo cáo thành công!',
            text: 'Cảm ơn bạn đã báo cáo. Chúng tôi sẽ xem xét thông tin của bạn.',
            confirmButtonText: 'Đóng',
        });
    };

    return (
        <div className="post-report-wrapper">
            <p className="report-title font-family-semibold">Báo cáo bài viết</p>
            
            <hr className='hr_report' />

            <p className="report-question font-family-semibold">Tại sao bạn lại viết báo cáo này?</p>
            
            <p className="note-line font-family-light">
                Báo cáo của bạn sẽ được ẩn danh. <br />
                Nếu ai đó đang gặp nguy hiểm, đừng chần chừ 
                mà hãy báo ngay cho dịch vụ <br />
                khẩn cấp ở địa phương.
            </p>
            <div className="list-report-answer">
                <Button 
                    className={`answer ${reportAnswer === 1 ? 'selected' : ''}`} 
                    size="small" 
                    onClick={() => handleAnswerClick(1)}
                >
                    Chỉ là tôi không thích bài viết này
                </Button>

                <Button 
                    className={`answer ${reportAnswer === 2 ? 'selected' : ''}`} 
                    size="small" 
                    onClick={() => handleAnswerClick(2)}
                >
                    Bạo lực, thù ghét hoặc bóc lột
                </Button>

                <Button 
                    className={`answer ${reportAnswer === 3 ? 'selected' : ''}`} 
                    size="small" 
                    onClick={() => handleAnswerClick(3)}
                >
                    Bán hoặc quảng cáo mặt hàng bị hạn chế
                </Button>

                <Button 
                    className={`answer ${reportAnswer === 4 ? 'selected' : ''}`} 
                    size="small" 
                    onClick={() => handleAnswerClick(4)}
                >
                    Thông tin sai sự thật
                </Button>

                <Button 
                    className={`answer ${reportAnswer === 5 ? 'selected' : ''}`} 
                    size="small" 
                    onClick={() => handleAnswerClick(5)}
                >
                    Ảnh khỏa thân hoặc hoạt động tình dục
                </Button>
            </div>
        </div>
    );
};

export default PostReport;
