import React from "react";
import imgPremiumPage from "../assets/img/premium.png";
import NavbarHomePage from '../components/navbarHomePage.component';
import Premium from '../components/premium.component';
import '../assets/css/premium.page.css';

export default function PremiumPage() {
    const premiumData = {
        period: "1 Tuần",
        price: "39.000 VND/1 tuần",
        shortDescription: "Tặng thêm lần đầu mua gói với giá 0 VNĐ",
        longDescription: [
            "1 tài khoản Premium",
            "Hủy bất cứ lúc nào",
        ],
        VAT: "Không bao gồm thuế GTGT"
    };
    const features = [
        { name: 'Tạo câu hỏi', free: 'Bị giới hạn 3 lần / ngày', premium: 'Không giới hạn' },
        { name: 'Chỉnh sửa câu hỏi', free: 'Bị giới hạn 10 lần / ngày', premium: 'Không giới hạn' },
      ];

    return (
        <>
            <NavbarHomePage />
            <img src={imgPremiumPage} alt='Premium Illustration' className='premium-image' />
            <div className="detail">
                <p className="title-premium font-family-semibold">Trải nghiệm sự khác biệt</p>
                <p className="content font-family-medium">Dùng Premium để nắm toàn quyền kiểm soát trải nghiệm</p>
                <p className="content font-family-medium">Hủy bất cứ lúc nào.</p>
            </div>
            <div className="premium_package_benefits">
                <p className="title_benefits font-family-medium">Lợi ích của gói Premium</p>
                <table className="plan-table">
                    <thead>
                    <tr>
                        <th>Quyền lợi</th>
                        <th>Gói Free</th>
                        <th>Gói Premium</th>
                    </tr>
                    </thead>
                    <tbody>
                    {features.map((feature, index) => (
                        <tr key={index}>
                        <td>{feature.name}</td>
                        <td>{feature.free}</td>
                        <td>{feature.premium}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="premium-grid-container">
                <Premium
                    period={premiumData.period}
                    price={premiumData.price}
                    shortDescription={premiumData.shortDescription}
                    longDescription={premiumData.longDescription}
                    VAT={premiumData.VAT}
                />
                <Premium
                    period={premiumData.period}
                    price={premiumData.price}
                    shortDescription={premiumData.shortDescription}
                    longDescription={premiumData.longDescription}
                    VAT={premiumData.VAT}
                />
                <Premium
                    period={premiumData.period}
                    price={premiumData.price}
                    shortDescription={premiumData.shortDescription}
                    longDescription={premiumData.longDescription}
                    VAT={premiumData.VAT}
                />
                <Premium
                    period={premiumData.period}
                    price={premiumData.price}
                    shortDescription={premiumData.shortDescription}
                    longDescription={premiumData.longDescription}
                    VAT={premiumData.VAT}
                />
            </div>
        </>
    );
}
