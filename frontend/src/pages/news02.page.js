import React from "react";

import MainLayout from "../layouts/main.layout";
import '../assets/css/news.page.css'
import img1 from "../assets/img/news02-img01.svg";
import img2 from "../assets/img/news02-img02.svg";
import img3 from "../assets/img/news02-img03.svg";

export default function News02() {

    return (
        <>
            <MainLayout>
                <div className="news-container">
                    <p className="news-name">Giáo dục trực tuyến thúc đẩy nền kinh tế số Việt Nam</p>
                    <div className="content">
                        <p>Biên soạn bởi: </p>
                        <p>Cập nhật ngày 23/11/2024, lúc 10:50</p>
                    </div>
                    <p className="content">
                        Đào tạo trực tuyến sẽ trở thành xu thế nổi bật tạo ra bước phát triển lớn cho nền kinh tế số Việt Nam, đại diện Hệ thống giáo dục HOCMAI cho hay.
                        <br/><br/>Nằm trong nhóm xu thế "Sự gia tăng về kỹ năng, dịch vụ, doanh nghiệp số và nền kinh tế việc làm tự do" - một trong 7 nhóm xu thế góp phần thúc đẩy nền kinh tế số Việt Nam, học trực tuyến và xu hướng tự học được đánh giá cao về sự phát triển.
                        <br/><br/>Đó là thông tin được đưa ra trong "Báo cáo Tương lai nền kinh tế số Việt Nam hướng tới năm 2030 và 2045" - một dự án đầu tiên trong khuôn khổ chương trình Aus4Innovation được thực hiện bởi CSIRO và Bộ Khoa học Công nghệ được xuất bản năm 2019. Đây là dự án nằm trong chương trình hợp tác giữa Bộ Khoa học Công nghệ của Việt Nam và Bộ Ngoại giao và Thương mại của Australia. 
                    </p>
                    <img src={img3}/>
                    <p className="content">
                        Xuất hiện từ khoảng cuối năm 1999, khái niệm "online learning" (học trực tuyến) hay "virtual learning" (học tập ảo) bắt đầu được dùng như một thuật ngữ chỉ môi trường học tập mà trong đó, người học có thể tương tác với môi trường học tập trực tuyến thông qua Internet hoặc các phương tiện truyền thông điện tử khác. Với những ưu điểm của mình, hình thức học tập trực tuyến ngày càng thuyết phục người dùng toàn cầu, đồng thời ghi tên ngành công nghiệp đào tạo trực tuyến vào trong bản đồ các ngành công nghiệp đạt doanh thu "khủng" trên thế giới.
                        <br/><br/>Thống kê của Cyber Universities năm 2018 cho thấy, tại Mỹ, hơn 80% trường đại học sử dụng phương thức đào tạo trực tuyến, trong khi đó, tại Singapore, con số này lên tới gần 90%. Theo nghiên cứu của Global Market Insights năm 2017, thị trường giáo dục trực tuyến toàn cầu được thiết lập để vượt qua giá trị 300 tỷ USD vào năm 2025. Quy mô thị trường được ước tính hơn 190 tỷ USD vào năm 2018 và được dự đoán sẽ tăng trưởng với tỷ lệ tăng trưởng kép vào khoảng 7%/năm trong giai đoạn 2019 - 2025.
                        <br/><br/>Tại châu Á, Ấn Độ hiện là một trong những thị trường dẫn đầu trong xu hướng này. Trường hợp của BYJU, một đơn vị khởi nghiệp cung cấp ứng dụng học trực tuyến cho đối tượng học sinh K-12, là một minh chứng.
                        <br/><br/>Theo báo cáo của IFC (Tổ chức tài chính thế giới) năm 2018, ra mắt từ tháng 10/2015, tính đến năm 2018, ứng dụng học trực tuyến của BYJU đã phủ đến hơn 1.700 thành phố tại Ấn Độ và các quốc gia tại Trung Đông, với hơn 15 triệu lượt tải ứng dụng và gần 1 triệu người dùng trả phí hàng năm.
                    </p>

                    <img src={img2}/>
                    <p className="content">
                        Trong một khảo sát năm 2018 của IFC, mỗi học sinh dành trung bình 53 phút học mỗi ngày trên ứng dụng và 92% phụ huynh được khảo sát công nhận việc con họ đã có cải thiện về điểm số rõ rệt. Theo đó, doanh thu đơn vị này tính đến 3/2018 đã chạm mốc 85 triệu USD và thu hút hơn 245 triệu USD đầu tư kể từ 2016. Đến 8/2017, đơn vị này nằm trong top 11 công ty khởi nghiệp vượt ngưỡng giá trị tăng trưởng hơn 1 tỉ đô la trên toàn Ấn Độ.
                        <br/><br/>Theo tờ University World News, châu Á là thị trường lớn thứ hai của giáo dục trực tuyến trên thế giới. Ấn Độ và Trung Quốc hiện là 2 quốc gia chiếm 70% vốn đầu tư mạo hiểm vào giáo dục trực tuyến toàn thế giới. Chỉ tính đến hết năm 2018, Trung Quốc nhận được 5,2 tỷ USD, xếp thứ nhất và Ấn Độ nhận được 0,7 tỷ USD, xếp thứ 3. Hai nước này cũng có tổng số người dùng chiếm 30% toàn thế giới. Tính đến năm 2019, thị trường học trực tuyến Trung Quốc có quy mô ước tính đến 45 triệu đô la với hơn 200 triệu người dùng, dự kiến tăng trưởng CAGR đến gần 24% giai đoạn từ 2017 - 2022, theo báo cáo từ Frost & Sullivan 2017.
                        <br/><br/>Tổng doanh thu mà thị trường châu Á đạt được trong lĩnh vực này vào năm 2018 rơi vào khoảng 12,1 tỷ USD. Trong đó, Việt Nam nằm trong top các quốc gia châu Á có thị trường phát triển nhanh về giáo dục trực tuyến.
                    </p>

                    <img src={img1}/>
                    <p className="content">
                        Tại Việt Nam, phương thức giáo dục trực tuyến xuất hiện khá sớm, đồng thời cũng có tốc độ phát triển năng động và bắt kịp xu hướng. Theo một số liệu mà Ambient Insight đưa ra gần đây, với tốc độ tăng trưởng 44,3%, Việt Nam còn vượt qua cả Malaysia (39.4%). Với đà này, Việt Nam sẽ tiếp tục tạo ra sức hút đầu tư lớn vào lĩnh vực này, không chỉ các doanh nghiệp trong nước mà còn cả các nhà đầu tư nước ngoài như: Nhật Bản, Hàn Quốc, Singapore...
                        <br/><br/>Trong báo cáo "Tương lai nền kinh tế số Việt Nam hướng tới năm 2030 và 2045", các chuyên gia đánh giá về khả năng tự học gia tăng tại Việt Nam thông qua sự phát triển mạnh của một số nền tảng học trực tuyến. Hocmai.vn - đơn vị cung cấp khóa học trực tuyến chuyên biệt cho đối tượng K-12 - là một ví dụ cho sự phát triển trong báo cáo này.
                        <br/><br/>Sau 12 năm hoạt động, đơn vị này đã cán mốc hơn 3,5 triệu người dùng, cung cấp hơn 1.000 khóa học với hơn 30.000 bài giảng mỗi năm và vẫn đang có xu hướng mở rộng. Theo số liệu 3 năm gần nhất, tỷ lệ người dùng đăng ký mới trên hệ thống học trực tuyến của đơn vị này mỗi năm tăng gần 20%, trong đó, tỷ lệ người học trả phí tăng hơn 30%/năm.
                        <br/><br/>Năm 2019, đơn vị này đạt danh hiệu Sao Khuê 2019 do Hiệp hội Phần mềm và Dịch vụ CNTT Việt Nam (VINASA) tổ chức, với ứng dụng hạ tầng ôn luyện cho học sinh, "Nền tảng học tập onluyen.vn" cho hạng mục "Các sản phẩm, giải pháp ứng dụng công nghệ trong cuộc cách mạng công nghiệp 4.0".
                        <br/><br/>Quyết định đưa CNTT vào tất cả cấp học trong chương trình giáo dục phổ thông mới từ năm 2020 của Bộ Giáo dục và Đào tạo đã cho thấy động thái mạnh mẽ trong việc mong muốn trang bị cho thế hệ trẻ khả năng để có thể bắt nhịp nhanh với xu thế trên thế giới.                    
                    </p> 
                </div>
               
            </MainLayout>
        </>
    );
}
