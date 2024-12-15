import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authentication.context";
import QuizzesAPI from "../api/quizzes.api";
import ExamAPI from "../api/exam.api";
import Swal from "sweetalert2";

import List from "../components/list.component";
import MainLayout from "../layouts/main.layout";

export default function HistoryPage() {
        const navigate = useNavigate()
        const { userId } = useAuth()
        const [quizData, setQuizData] = useState([])
        const [quizAttemptData, setQuizAttemptData] = useState({})
        const [listData, setListData] = useState([])

        const columns = [
            {
                title: "Tên đề",
                dataIndex: "title",
                key: "title",
                align: "center",
                filtered: true,
                filterSearch: true
            },
            {
                title: "Số lượng câu hỏi",
                dataIndex: "questionNumber",
                key: "questionNumber",
                align: "center",
                filtered: true
            },
            {
                title: "Thời gian thực hiện (phút)",
                dataIndex: "timeLimit",
                key: "timeLimit",
                align: "center",
                filtered: true
            },
            {
                title: "Số lần thực hiện",
                dataIndex: "attemptCount",
                key: "attemptCount",
                align: "center",
                filtered: true
            },
            {
                title: "Điểm số trung bình",
                dataIndex: "avgScore",
                key: "avgScore",
                align: "center",
                filtered: true
            },
            {
                title: "Mức độ hoàn thành",
                dataIndex: "avgCompletion",
                key: "avgCompletion",
                align: "center",
                filtered: true,
                render: (number) => number ? number * 100 + "%" : null
            },
            {
                title: "Ngày cập nhật",
                dataIndex: "updatedAt",
                key: "updatedAt",
                align: "center",
                filtered: true,
                render: (text) => (new Date(text).toLocaleDateString())
            },
            {
                title: "Trạng thái",
                dataIndex: "status",
                key: "status",
                align: "center",
                render: (text, record) => (
                    <p 
                        className="link-effect"
                        onClick={() => navigate("/list-of-completed-exams?quiz_id=" + record['key'])}
                    >
                        {text}
                    </p>
                )
            },
        ]
    
        useEffect(() => {

            QuizzesAPI.getAllQuiz(userId)
            .then(response => response.json())
            .then(data => {
                if(data?.success) {
                    setQuizData(
                        data?.data.map(quiz => ({
                            key: quiz?.quiz_id,
                            title: quiz?.title,
                            attemptCount: quiz?.attempt_count,
                            questionNumber: quiz?.number_of_questions,
                            timeLimit: quiz?.time_limit,
                            updatedAt: quiz?.updated_at,
                            status: "Xem chi tiết"
                        }))
                    )
                } else {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Lấy danh sách tất cả đề ôn thất bại",
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
                    title: "Lấy danh sách tất cả đề ôn thất bại",
                    text: error?.message,
                    showConfirmButton: false,
                    timer: 1500
                })
            })
    
        }, [userId])

        useEffect(() => {
            const fetchQuizAttempts = quizData.map(quiz => (
                ExamAPI.getListAllQuizAttempts(quiz?.key)
                .then(response => response.json())
                .then(data => {
                    if (data?.success) {
                        const avgScore = (data?.data?.reduce((previous, current) => previous + current?.score, 0) / data?.data.length).toFixed(2)
                        const avgCompletion = (data?.data?.reduce((previous, current) => previous + (current?.correct_ans_count / current?.number_of_question), 0) / data?.data.length).toFixed(2)
                        return {
                            key: quiz?.key,
                            avgScore: (avgScore && avgScore !== "NaN") ? avgScore : "",
                            avgCompletion: (avgCompletion && avgCompletion !== "NaN") ? avgCompletion : ""
                        }
                    } else {
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: "Lấy danh sách lịch sử làm bài thất bại",
                            text: data?.message,
                            showConfirmButton: false,
                            timer: 1500
                        })
                        return null
                    }
                })
                .catch(error => {
                    console.error(error)
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Lấy danh sách lịch sử làm bài thất bại",
                        text: error?.message,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    return null
                })
            ))

            Promise.all(fetchQuizAttempts)
            .then(response => {
                let updatedQuizAttemptData = {}
                response.forEach(quizAttempt => {
                    updatedQuizAttemptData[quizAttempt.key] = {
                        avgScore: quizAttempt.avgScore,
                        avgCompletion: quizAttempt.avgCompletion
                    }
                })
                setQuizAttemptData(updatedQuizAttemptData)
            })
            .then(() => {
                
            })
        }, [quizData])

        useEffect(() => {
            const updatedListData = quizData.map(quiz => ({
                ...quiz,
                ...quizAttemptData[quiz.key]
            }))
            setListData(updatedListData)
        }, [quizAttemptData])

    return (
        <>
            <MainLayout>
                <List 
                    list={{
                        sections: [],
                        columns: columns,
                        data: listData
                    }} 
                    listTitle={'Danh sách lịch sử làm bài'} 
                    emptyMessage={"Không có lịch sử làm bài"} 
                />
            </MainLayout>
        </>
    )
}