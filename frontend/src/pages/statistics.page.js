import React from "react";
import MainLayout from "../layouts/main.layout";
import '../assets/css/statistics.css'; 

export default function StatisticsPage() {
    return (
        <MainLayout>
            <div className="statistics-grid">
                <div className="grid-item">
                    <p>Thống kê theo tuần</p>
                    <div className="chart-container">
                        <p>Biểu đồ tuần sẽ được chèn ở đây</p>
                    </div>
                </div>

                <div className="grid-item">
                    <p>Thống kê theo tháng</p>
                    <div className="chart-container">
                        <p>Biểu đồ tháng sẽ được chèn ở đây</p>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
