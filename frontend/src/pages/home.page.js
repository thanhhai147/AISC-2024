import React from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../layouts/main.layout";
import FunctionBoxes from "../components/functionBoxes.component";
import SlideBanner from "../components/slideBanner.component";
import News from "../components/news.component";
import FeatureIntro from "../components/featureIntro.component";
import Swal from "sweetalert2";
import Button from "../components/button.component";
import news1 from "../assets/img/tu-hoc.png";
import news2 from "../assets/img/giao-duc-truc-tuyen.png";
import news3 from "../assets/img/e-learning.png";

export default function HomePage() {
    const navigate = useNavigate()

    const handleNotLogin = () => {
    Swal.fire({
        title: "Vui lòng đăng nhập để tiếp tục tạo đề thi! Xin cảm ơn.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Đăng nhập",
        cancelButtonText: "Huỷ",
        customClass: {
        popup: "my-popup",
        },
        allowEscapeKey: false,
        didOpen: (popup) => {
        console.log(popup);
        },
    }).then((result) => {
        if (result.isConfirmed) {
        navigate('/login')
        } 
    });
    };


    const newsData = [
        {
            id: 1,
            img: news1,
            alt: "Tự học",
            title: "6 lợi ích của tự học mà bạn không nên bỏ lỡ",
            // param: "6-loi-ich-cua-tu-hoc",
        },
        {
            id: 2,
            img: news2,
            alt: "Giáo dục trực tuyến",
            title: "Theo khảo sát của IFC 2018, sự bùng nổ của giáo dục trực tuyến đã làm gia tăng nhu cầu về công cụ hỗ trợ học tập",
            // param: "giao-duc-truc-tuyen-gia-tang-nhu-cau-ve-cong-cu-ho-tro",
        },
        {
            id: 3,
            img: news3,
            alt: "E-learning",
            title: "5 phần mềm dạy học trực tuyến tốt nhất hiện nay ở Việt Nam",
            // param: "5-phan-mem-day-hoc-truc-tuyen",
        },
    ];

    return (
        <>
            <MainLayout>
                <FunctionBoxes />
                <SlideBanner />
                <News type={1}/>
                <FeatureIntro/>
               
            </MainLayout>
        </>
    );
}
