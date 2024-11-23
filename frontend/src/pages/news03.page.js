import React from "react";

import MainLayout from "../layouts/main.layout";
import '../assets/css/news.page.css'
import news03 from "../assets/img/e-learning.png"
import img1 from "../assets/img/news03-img01.svg";
import img2 from "../assets/img/news03-img02.svg";
import img3 from "../assets/img/news03-img03.svg";
import img4 from "../assets/img/news03-img04.svg";

export default function News03() {

    return (
        <>
            <MainLayout>
                <div className="news-container">
                    <p className="news-name">4 phần mềm dạy học trực tuyến tốt nhất hiện nay ở Việt Nam</p>
                    <div className="content">
                        <p>Biên soạn bởi: </p>
                        <p>Cập nhật ngày 23/11/2024, lúc 10:50</p>
                    </div>
                    <img className="main-img" src={news03}/>
                    <p className="content">
                        Việc dạy học trực tuyến giúp người dạy cũng như người học rút ngắn thời gian, tiết kiệm chi phí, dễ dàng, thuận tiện trong việc trao đổi, việc học cũng trở nên chủ động hơn            
                    </p>

                    <p className="title-1">1. Zoom</p>
                        
                        <p className="title-2">1.1. Giới thiệu về Zoom</p>
                        <p className="content">
                            Zoom là một nền tảng ứng dụng hỗ trợ việc liên lạc trực tuyến được phát triển bởi Zoom Video Communicatión. Ra mắt vào năm 2011, Zoom nhanh chóng trở thành công cụ phổ biến cho các cuộc họp, hội nghị trực tuyến, học tập từ xa và giao tiếp nhóm. 
                            <br/><br/>Zoom cho phép người dùng tổ chức các cuộc gọi video với nhiều người tham gia, chia sẻ màn hình, thảo luận với chất lượng video HD và thu âm ổn định                        
                        </p>
                        <img src={img1}/>
                        <p className="title-2">1.2. Ưu điểm</p>
                        <p className="content">
                            <b>Dễ sử dụng:</b> Zoom có giao diện đơn giản và thân thiện với người dùng, giúp người dùng dễ dàng tạo và tham gia các cuộc họp chỉ với vài thao tác.
                            <br/><br/><b>Chất lượng video và âm thanh tốt:</b> Zoom hỗ trợ video và âm thanh chất lượng cao, đảm bảo các cuộc họp diễn ra mượt mà ngay cả khi đường truyền internet không ổn định.
                            <br/><br/><b>Tính năng đa dạng:</b> Zoom cung cấp nhiều tính năng như chia sẻ màn hình, phòng họp nhỏ (breakout rooms), ghi lại cuộc họp, chat trong cuộc họp, và nền ảo.
                            <br/><br/><b>Hỗ trợ nhiều thiết bị:</b> Zoom có thể sử dụng trên nhiều nền tảng và thiết bị khác nhau như máy tính, điện thoại thông minh, và máy tính bảng, giúp người dùng dễ dàng kết nối mọi lúc, mọi nơi.
                            <br/><br/><b>Tính linh hoạt cao:</b> Zoom phù hợp cho các cuộc họp từ nhỏ đến lớn, với khả năng hỗ trợ lên đến hàng nghìn người tham gia trong một cuộc họp.
                        </p>

                        <p className="title-2">1.3. Nhược điểm</p>
                        <p className="content">
                            <b>Vấn đề bảo mật:</b> Trong quá khứ, Zoom đã gặp một số vấn đề liên quan đến bảo mật và quyền riêng tư (như "Zoombombing"), mặc dù công ty đã cải thiện nhiều sau đó.
                            <br/><br/><b>Phiên bản miễn phí có giới hạn:</b> Phiên bản miễn phí của Zoom giới hạn thời gian họp trong 40 phút đối với các cuộc họp có nhiều hơn 3 người tham gia.
                            <br/><br/><b>Yêu cầu kết nối internet tốt:</b> Dù Zoom có thể hoạt động trong môi trường internet không ổn định, nhưng để có trải nghiệm tốt nhất, vẫn cần một kết nối internet mạnh.                        
                        </p>
                    
                    
                    <p className="title-1">2. Microsoft Teams</p>
                        <p className="title-2">2.1. Giới thiệu về Microsoft Teams</p>
                            <p className="content">
                                Microsoft Teams là một nền tảng giao tiếp và cộng tác trực tuyến được phát triển bởi Microsoft, ra mắt vào năm 2017. Teams được tích hợp chặt chẽ với các sản phẩm Microsoft 365 (trước đây là Office 365), giúp người dùng dễ dàng tổ chức các cuộc họp trực tuyến, nhắn tin nhóm, chia sẻ tài liệu, và phối hợp làm việc. Teams đã trở thành công cụ phổ biến trong nhiều tổ chức, đặc biệt là trong môi trường doanh nghiệp và giáo dục.
                            </p>
                            <img src={img2}/>

                        <p className="title-2">2.2. Ưu điểm</p>
                            <p className="content">
                                <b>Tích hợp tốt với Microsoft 365:</b> Teams tích hợp trực tiếp với các ứng dụng như Word, Excel, PowerPoint, SharePoint, và OneDrive, giúp việc chia sẻ và chỉnh sửa tài liệu trở nên dễ dàng và liền mạch.
                                <br/><br/><b>Giao tiếp đa dạng:</b> Ngoài việc tổ chức các cuộc họp video, Teams còn hỗ trợ chat nhóm, gọi thoại, và tạo kênh riêng cho các dự án hoặc nhóm nhỏ trong tổ chức.
                                <br/><br/><b>Bảo mật và quản lý quyền người dùng tốt:</b> Là một sản phẩm của Microsoft, Teams tuân thủ các tiêu chuẩn bảo mật và quyền riêng tư cao, phù hợp với các tổ chức yêu cầu bảo mật khắt khe.
                                <br/><br/><b>Tính năng cộng tác mạnh mẽ:</b> Teams cho phép nhiều người dùng cùng chỉnh sửa tài liệu trong thời gian thực, thuận tiện cho các dự án nhóm.
                                <br/><br/><b>Khả năng mở rộng với các ứng dụng bên thứ ba:</b> Teams có thể tích hợp với nhiều ứng dụng bên thứ ba thông qua kho ứng dụng của Microsoft, giúp tăng cường khả năng tùy chỉnh và phù hợp với nhu cầu của từng tổ chức.
                            </p>

                        <p className="title-2">2.3. Nhược điểm</p>
                            <p className="content">
                                <b>Giao diện phức tạp đối với người mới:</b> So với Zoom, giao diện của Teams có thể phức tạp hơn, đặc biệt là với người mới bắt đầu sử dụng hoặc không quen với các sản phẩm Microsoft.
                                <br/><br/><b>Yêu cầu tài khoản Microsoft 365:</b> Để tận dụng đầy đủ các tính năng của Teams, người dùng cần có tài khoản Microsoft 365, điều này có thể là hạn chế đối với những người không sử dụng bộ sản phẩm này.
                                <br/><br/><b>Sử dụng tài nguyên hệ thống:</b> Teams có thể tiêu tốn khá nhiều tài nguyên hệ thống, đặc biệt khi sử dụng với nhiều ứng dụng hoặc chia sẻ tài liệu lớn.
                                <br/><br/><b>Phiên bản miễn phí có giới hạn:</b> Tương tự như Zoom, phiên bản miễn phí của Teams cũng có giới hạn về tính năng và số lượng người tham gia, buộc người dùng phải nâng cấp lên bản trả phí để sử dụng đầy đủ.
                            </p>


                    <p className="title-1">3. Google Meet</p>
                        <p className="title-2">3.1. Giới thiệu về Google Meet</p>
                            <p className="content">
                                Google Meet là một nền tảng hội nghị truyền hình trực tuyến do Google phát triển, là một phần của bộ công cụ Google Workspace (trước đây là G Suite). Google Meet cho phép người dùng tổ chức các cuộc họp video trực tuyến, học tập từ xa, và giao tiếp nhóm, tất cả đều được tích hợp liền mạch với các sản phẩm khác của Google như Gmail, Google Calendar, và Google Drive. Google Meet ban đầu chỉ dành cho người dùng doanh nghiệp, nhưng sau đó đã được mở rộng cho tất cả người dùng cá nhân.                            </p>
                            <img src={img3}/>

                        <p className="title-2">3.2. Ưu điểm</p>
                            <p className="content">
                                <b>Tích hợp với hệ sinh thái Google:</b> Google Meet hoạt động liền mạch với các sản phẩm Google như Gmail, Google Calendar, và Google Drive, giúp việc lên lịch, tham gia và chia sẻ tài liệu trong các cuộc họp dễ dàng hơn.
                                <br/><br/><b>Dễ sử dụng:</b> Giao diện của Google Meet đơn giản và thân thiện, người dùng có thể tham gia cuộc họp chỉ bằng một cú nhấp chuột từ liên kết được gửi qua email hoặc Google Calendar.
                                <br/><br/><b>Không yêu cầu cài đặt:</b> Google Meet hoạt động trực tiếp trên trình duyệt web mà không cần cài đặt phần mềm, giúp giảm bớt phức tạp và tăng tính linh hoạt.
                                <br/><br/><b>Bảo mật tốt:</b> Google Meet được trang bị các tính năng bảo mật cao như mã hóa đầu cuối, quản lý quyền truy cập, và khả năng chặn người lạ tham gia vào các cuộc họp.
                                <br/><br/><b>Hỗ trợ trên nhiều thiết bị:</b> Google Meet có thể sử dụng trên nhiều nền tảng khác nhau như máy tính, điện thoại thông minh và máy tính bảng, giúp người dùng dễ dàng kết nối từ bất kỳ đâu.
                            </p>

                        <p className="title-2">3.3. Nhược điểm</p>
                            <p className="content">
                                <b>Giới hạn tính năng trên phiên bản miễn phí:</b> Phiên bản miễn phí của Google Meet giới hạn số lượng người tham gia (lên đến 100 người) và thời gian cuộc họp (60 phút), điều này có thể là hạn chế đối với các cuộc họp lớn hoặc kéo dài.
                                <br/><br/><b>Tính năng ít so với các đối thủ:</b> So với Zoom hay Microsoft Teams, Google Meet thiếu một số tính năng cao cấp như chia phòng họp nhỏ (breakout rooms), nền ảo tùy chỉnh, và các tùy chọn ghi chú tích hợp.
                                <br/><br/><b>Yêu cầu kết nối internet ổn định:</b> Giống như các công cụ hội nghị video khác, Google Meet yêu cầu kết nối internet ổn định để đảm bảo chất lượng âm thanh và hình ảnh tốt nhất.
                                <br/><br/><b>Không hỗ trợ tính năng cộng tác mạnh mẽ:</b> Mặc dù tích hợp tốt với Google Drive, Google Meet không cung cấp nhiều tính năng cộng tác trực tiếp trong cuộc họp như Microsoft Teams hay Zoom.
                            </p>
                            
                            
                            
                    <p className="title-1">4. Skype</p>
                        <p className="title-2">4.1. Giới thiệu về Skype</p>
                            <p className="content">
                                Skype là một nền tảng liên lạc trực tuyến nổi tiếng, được phát triển bởi Microsoft, cho phép người dùng thực hiện cuộc gọi video, cuộc gọi thoại, nhắn tin và chia sẻ tệp tin. Ra mắt vào năm 2003, Skype nhanh chóng trở thành một trong những ứng dụng phổ biến nhất cho các cuộc gọi video quốc tế và giao tiếp nhóm. Skype hiện vẫn được sử dụng rộng rãi trong các cuộc họp cá nhân, họp doanh nghiệp nhỏ, và giao tiếp quốc tế.  
                            </p>
                            <img src={img4}/>
                        <p className="title-2">4.2. Ưu điểm</p>
                            <p className="content">
                                <b>Gọi điện quốc tế miễn phí:</b> Skype cho phép người dùng thực hiện các cuộc gọi video và thoại miễn phí giữa những người dùng Skype trên toàn thế giới, giúp tiết kiệm chi phí cho các cuộc gọi quốc tế.
                                <br/><br/><b>Hỗ trợ trên nhiều nền tảng:</b> Skype hoạt động trên nhiều thiết bị và hệ điều hành khác nhau như Windows, macOS, Android, iOS, và thậm chí có phiên bản web, giúp người dùng dễ dàng kết nối từ bất kỳ đâu.
                                <br/><br/><b>Nhắn tin và chia sẻ tệp:</b> Skype cung cấp tính năng nhắn tin văn bản và cho phép người dùng chia sẻ tệp, hình ảnh và video một cách nhanh chóng và thuận tiện.
                                <br/><br/><b>Cuộc gọi nhóm:</b> Skype hỗ trợ các cuộc gọi video nhóm với tối đa 100 người tham gia, điều này lý tưởng cho các cuộc họp nhỏ hoặc cuộc trò chuyện gia đình đông người.
                                <br/><br/><b>Tích hợp với Microsoft:</b> Là một phần của Microsoft, Skype tích hợp tốt với các sản phẩm Microsoft khác như Outlook và Office 365, giúp người dùng dễ dàng lên lịch và tổ chức các cuộc họp.
                                <br/><br/><b>Tính năng Skype-to-Phone:</b> Ngoài các cuộc gọi miễn phí giữa người dùng Skype, Skype cũng cung cấp dịch vụ gọi điện thoại đến các số di động và điện thoại cố định với mức phí thấp, giúp kết nối với người không dùng Skype.
                            </p>

                        <p className="title-2">4.3. Nhược điểm</p>
                            <p className="content">
                                <b>Chất lượng không ổn định:</b> Skype đôi khi gặp phải vấn đề về chất lượng cuộc gọi, đặc biệt là khi kết nối mạng yếu. Các cuộc gọi video và thoại có thể bị gián đoạn hoặc bị giảm chất lượng.
                                <br/><br/><b>Ít tính năng nâng cao so với đối thủ:</b> Skype thiếu nhiều tính năng hiện đại so với các nền tảng như Zoom hay Microsoft Teams, ví dụ như phòng họp nhỏ (breakout rooms), bảng trắng (whiteboard), và quản lý cuộc họp chi tiết.
                                <br/><br/><b>Giao diện phức tạp:</b> Một số người dùng nhận xét rằng giao diện của Skype có phần lộn xộn và phức tạp so với các ứng dụng liên lạc hiện đại khác.
                                <br/><br/><b>Tính năng cộng tác hạn chế:</b> Skype không cung cấp các công cụ cộng tác mạnh mẽ như chỉnh sửa tài liệu theo thời gian thực hay tích hợp sâu với các ứng dụng quản lý dự án, điều này có thể hạn chế cho việc sử dụng trong môi trường doanh nghiệp lớn.
                            </p>
                            
                </div>
               
            </MainLayout>
        </>
    );
}
