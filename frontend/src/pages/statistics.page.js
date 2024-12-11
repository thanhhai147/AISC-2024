import React, { useState, useEffect } from "react";
import MainLayout from "../layouts/main.layout";
import '../assets/css/statistics.css'; 
import Swal from "sweetalert2";
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { useAuth } from "../context/authentication.context";
import ExamAPI from "../api/exam.api";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function StatisticsPage() {
    const { userId } = useAuth()
    const [data, setData] = useState(null)
    const [chartData, setChartData] = useState(null)

    useEffect(() => {
        ExamAPI.getStatistics(userId)
        .then(response => response.json())
        .then(data => {
            if (data?.success) {
                setData(data?.data)
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Thống kê kết quả thất bại",
                    text: data?.message,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
        .catch(error => {
            console.error(error)
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Thống kê kết quả thất bại",
                text: error?.message,
                showConfirmButton: false,
                timer: 1500
            })
        })
    }, [])

    useEffect(() => {
        if (!data) return
        setChartData({
            weekly: {
                labels: data?.weekly_statistics?.map(week => week?.week),
                datasets: [
                    {
                        label: 'Số lần ôn tập',
                        data: data?.weekly_statistics?.map(week => week?.results?.length),
                        fill: false,
                        borderColor: 'rgb(200, 155, 9)',
                        tension: 0.1
                    },
                    {
                        label: 'Điểm trung bình',
                        data: data?.weekly_statistics?.map(week => week?.results?.reduce((accumulator, currentResult) => accumulator + currentResult?.score, 0) / week?.results?.length),
                        fill: false,
                        borderColor: 'rgb(15, 44, 89)',
                        tension: 0.1
                    }
                ]
            },
            monthly: {
                labels: data?.monthly_statistics?.map(month => month?.month),
                datasets: [
                    {
                        label: 'Số lần ôn tập',
                        data: data?.monthly_statistics?.map(month => month?.results?.length),
                        fill: false,
                        borderColor: 'rgb(200, 155, 9)',
                        tension: 0.1
                    },
                    {
                        label: 'Điểm trung bình',
                        data: data?.monthly_statistics?.map(month => month?.results?.reduce((accumulator, currentResult) => accumulator + currentResult?.score, 0) / month?.results?.length),
                        fill: false,
                        borderColor: 'rgb(15, 44, 89)',
                        tension: 0.1
                    }
                ]
            }
        })
    }, [data])

    useEffect(() => {
        console.log(chartData)
    }, [chartData])

    return (
        <MainLayout>
            <div className="statistics-grid">
                <div className="grid-item">
                    <p>Thống kê theo tuần</p>
                    <div className="chart-container">
                        {
                            chartData?.weekly &&
                            <Line data={chartData?.weekly} />
                        }
                    </div>
                </div>

                <div className="grid-item">
                    <p>Thống kê theo tháng</p>
                    <div className="chart-container">
                        {
                            chartData?.weekly &&
                            <Line data={chartData?.monthly} />
                        }
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
