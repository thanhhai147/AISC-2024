import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authentication.context";
import ExamAPI from "../api/exam.api";
import Swal from "sweetalert2";

import MainLayout from "../layouts/main.layout";
import FunctionBoxes from "../components/functionBoxes.component";
import SlideBanner from "../components/slideBanner.component";
import News from "../components/news.component";
import FeatureIntro from "../components/featureIntro.component";

export default function HomePage() {
    const { userId } = useAuth()
    const [recentData, setRecentData] = useState(null)

    useEffect(() => {
        ExamAPI.getRecentActivities(userId, 5)
        .then(response => response.json())
        .then(data => {
            if(data?.success) {
                setRecentData(data?.data?.map(item => ({
                    quizId: item?.quiz_id,
                    title: item?.title,
                    updatedAt: item?.updated_at
                })))
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Lấy danh sách hoạt động gần đây thất bại",
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
                title: "Lấy danh sách hoạt động gần đây thất bại",
                text: error?.message,
                showConfirmButton: false,
                timer: 1500
            })
        })
    }, [userId])

    return (
        <>
            <MainLayout>
                <FunctionBoxes activities={recentData?.map(activity => ({
                    "title": activity?.title,
                    "time": activity?.updatedAt,
                    "navigateTo": `/exam-detail?quiz_id=${activity?.quizId}`
                }))} />
                <SlideBanner />
                <News type={1}/>
                <FeatureIntro/> 
            </MainLayout>
        </>
    );
}
