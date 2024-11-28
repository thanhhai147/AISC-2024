import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/news.css";

import news1 from "../assets/img/tu-hoc.png";
import news2 from "../assets/img/giao-duc-truc-tuyen.png";
import news3 from "../assets/img/e-learning.png";
import news4 from "../assets/img/tu-hoc-2.png";
import news5 from "../assets/img/e-learning-2.png";


export default function News({ type = 1 }) {
    const navigate = useNavigate()
    const newsData1 = [
        {
            id: 1,
            img: news1,
            alt: "Tự học",
            title: "6 lợi ích của tự học mà bạn không nên bỏ lỡ",
            param: "6-loi-ich-cua-tu-hoc",
        },
        {
            id: 2,
            img: news2,
            alt: "Giáo dục trực tuyến",
            title: "Theo khảo sát của IFC 2018, sự bùng nổ của giáo dục trực tuyến đã làm gia tăng nhu cầu về công cụ hỗ trợ học tập",
            param: "giao-duc-truc-tuyen-gia-tang-nhu-cau-ve-cong-cu-ho-tro",
        },
        {
            id: 3,
            img: news3,
            alt: "E-learning",
            title: "4 phần mềm dạy học trực tuyến tốt nhất hiện nay ở Việt Nam",
            param: "4-phan-mem-day-hoc-truc-tuyen",
        },
    ];

    const newsData2 = [
        {
            id: 1,
            img: news4,
            alt: "Tự học",
            title: "6 lợi ích của tự học mà bạn không nên bỏ lỡ",
            intro: "Tự học giúp bạn hoàn toàn chủ động trong việc lựa chọn kiến thức phù hợp với mục tiêu và nhu cầu của bản thân. Bạn có thể tự thiết kế lộ trình học tập, lựa chọn thời gian và địa điểm học mà không bị ràng buộc bởi lịch trình cứng nhắc của các lớp học truyền thống.",
            param: "6-loi-ich-cua-tu-hoc",
        },
        {
            id: 2,
            img: news5,
            alt: "Giáo dục trực tuyến",
            title: "Giáo dục trực tuyến thúc đẩy nền kinh tế số Việt Nam",
            intro: "Đào tạo trực tuyến sẽ trở thành xu thế nổi bật tạo ra bước phát triển lớn cho nền kinh tế số Việt Nam, đại diện Hệ thống giáo dục HOCMAI cho hay.",
            param: "giao-duc-truc-tuyen-gia-tang-nhu-cau-ve-cong-cu-ho-tro",
        },
    ];

    return (
        <>
            {type === 1 && (
                <div className="news-no-intro-container">
                    <p className="title font-family-semibold primary-color">Tin tức mới nhất</p>
                    <div className="news-no-intro-wrapper">
                        {newsData1.map((news) => (
                            <div key={news.id} className="news-no-intro">
                                <img src={news.img} alt={news.alt} />
                                <a 
                                    className="black-color font-family-regular"
                                    onClick={() => navigate(`/news/${news.param}`)}
                                >
                                    {news.title}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {type === 2 && (
                <div className="news-intro-container">
                    {newsData2.map((news) => (
                        <div key={news.id} className="news-inline">
                            <img src={news.img} alt={news.alt} />
                            <span className="news-intro">
                                <a 
                                    className="black-color font-family-regular"
                                    onClick={() => navigate(`/news/${news.param}`)}
                                >
                                    {news.title}
                                </a>
                                <p className="news-intro font-family-regular">{news.intro}</p>
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
