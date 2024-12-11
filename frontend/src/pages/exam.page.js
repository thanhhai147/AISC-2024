import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authentication.context";
import QuizzesAPI from "../api/quizzes.api";
import Swal from "sweetalert2";

import MainLayout from "../layouts/main.layout";
import FunctionBoxes from "../components/functionBoxes.component";
import List from "../components/list.component";
import Button from "../components/button.component";

export default function ExamPage() {
    const navigate = useNavigate()
    const { userId } = useAuth()
    const [listData, setListData] = useState([])

    const sections = ["Tất cả đề ôn ", "Đề đã làm", "Đề chưa làm"]
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
            title: "Số lần làm bài",
            dataIndex: "attemptCount",
            key: "attemptCount",
            align: "center",
            filtered: true
        },
        {
            title: "Thời gian thực hiện",
            dataIndex: "timeLimit",
            key: "timeLimit",
            align: "center",
            filtered: true
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
            title: "Chi tiết",
            dataIndex: "detail",
            key: "detail",
            align: "center",
            render: (_, record) => (
                <a 
                    className="link-effect black-color"
                    onClick={() => navigate("/exam-detail?quiz_id=" + record['key'])}
                >
                    Xem chi tiết
                </a>
            )
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            align: "center",
            render: (text, record) => (
                <span className="d-flex flex-row align-items-center justify-content-center">
                    <Button 
                        type="warning" 
                        size="small"
                        onClick={() => handleDeleteQuiz(record['key'])}
                    >
                        {text.split("-")[0]}
                    </Button>
                    <span className="ml-1"></span>
                    <Button 
                        type="success" 
                        size="small" 
                        onClick={() => navigate("/take-exam?quiz_id" + record['key'])}
                    >
                        {text.split("-")[1]}
                    </Button>
                </span>
            )
        },
    ]

    useEffect(() => {

        const fetchAllQuiz = QuizzesAPI.getAllQuiz(userId)
        .then(response => response.json())
        .then(data => {
            if(data?.success) {
                return data?.data
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Lấy danh sách tất cả đề ôn thất bại",
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
                title: "Lấy danh sách tất cả đề ôn thất bại",
                text: error?.message,
                showConfirmButton: false,
                timer: 1500
            })
            return null
        })

        const fetchAttendedQuiz = QuizzesAPI.getAttendedQuiz(userId)
        .then(response => response.json())
        .then(data => {
            if(data?.success) {
                return data?.data
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Lấy danh sách đề ôn đã làm thất bại",
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
                title: "Lấy danh sách đề ôn đã làm thất bại",
                text: error?.message,
                showConfirmButton: false,
                timer: 1500
            })
            return null
        })

        const fetchUnAttendedQuiz = QuizzesAPI.getUnattendedQuiz(userId)
        .then(response => response.json())
        .then(data => {
            if(data?.success) {
                return data?.data
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Lấy danh sách đề ôn chưa làm thất bại",
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
                title: "Lấy danh sách đề ôn chưa làm thất bại",
                text: error?.message,
                showConfirmButton: false,
                timer: 1500
            })
            return null
        })

        Promise.all([fetchAllQuiz, fetchAttendedQuiz, fetchUnAttendedQuiz])
        .then(response => {
            setListData([
                response[0].map(quiz => ({
                    key: quiz?.quiz_id,
                    title: quiz?.title,
                    attemptCount: quiz?.attempt_count,
                    questionNumber: quiz?.number_of_questions,
                    timeLimit: quiz?.time_limit,
                    updatedAt: quiz?.updated_at,
                    status: "Xóa-Ôn tập"
                })),
                response[1].map(quiz => ({
                    key: quiz?.quiz_id,
                    title: quiz?.title,
                    attemptCount: quiz?.attempt_count,
                    questionNumber: quiz?.number_of_questions,
                    timeLimit: quiz?.time_limit,
                    updatedAt: quiz?.updated_at,
                    status: "Xóa-Ôn tập"
                })),
                response[2].map(quiz => ({
                    key: quiz?.quiz_id,
                    title: quiz?.title,
                    attemptCount: quiz?.attempt_count,
                    questionNumber: quiz?.number_of_questions,
                    timeLimit: quiz?.time_limit,
                    updatedAt: quiz?.updated_at,
                    status: "Xóa-Ôn tập"
                })),
            ])
        })
        .catch(error => {
            console.error(error)
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Lấy danh sách đề ôn thất bại",
                text: error?.message,
                showConfirmButton: false,
                timer: 1500
            })
        })

    }, [userId])

    const handleDeleteQuiz = (quizId) => {
        QuizzesAPI.deleteQuiz(quizId)
        .then(response => response.json())
        .then(data => {
            if(data?.success) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Xóa đề ôn thành công",
                    showConfirmButton: false,
                    timer: 1500
                })
                .then(() => {
                    window.location.reload()
                })
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Xóa đề ôn thất bại",
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
                title: "Xóa đề ôn thất bại",
                text: error?.message,
                showConfirmButton: false,
                timer: 1500
            })
        })
    }

    return (
        <>
            <MainLayout>
                <FunctionBoxes activities={[{'title': 'Đề ôn số 1', 'time': '9/4/2024 12:30', 'navigateTo': '/exam-detail?quiz_id=1'}]} />
                <List 
                    list={{
                        sections: sections,
                        columns: columns,
                        data: listData
                    }} 
                    listTitle={'Danh sách đề ôn'} 
                    emptyMessage={"Không có đề ôn"} 
                />
            </MainLayout>
        </>
    )
}