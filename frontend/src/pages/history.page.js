import React from "react";
import { useNavigate } from "react-router-dom";

import List from "../components/list.component";
import MainLayout from "../layouts/main.layout";

export default function HistoryPage() {
        const navigate = useNavigate()
    
        const list = {
            sections: ["Tất cả đề ôn", "Đề đang làm", "Đề đã làm", "Đề chưa làm"],
            columns: [
                {
                    title: "Tên đề",
                    dataIndex: "name",
                    key: "name",
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
                    title: "Điểm số",
                    dataIndex: "score",
                    key: "score",
                    align: "center",
                    filtered: true
                },
                {
                    title: "Thời gian thực hiện",
                    dataIndex: "time",
                    key: "time",
                    align: "center",
                    filtered: true
                },
                {
                    title: "Số lần thực hiện",
                    dataIndex: "numberOfAttempts",
                    key: "numberOfAttempts",
                    align: "center",
                    filtered: true
                },
                {
                    title: "Ngày tạo",
                    dataIndex: "date",
                    key: "date",
                    align: "center",
                    filtered: true
                },
                {
                    title: "Mức độ hoàn thành",
                    dataIndex: "levelOfCompletation",
                    key: "levelOfCompletation",
                    align: "center",
                    filtered: true
                },
                {
                    title: "Trạng thái",
                    dataIndex: "status",
                    key: "status",
                    align: "center",
                    render: (text, record) => (
                        <a 
                            className="link-effect black-color"
                            onClick={() => navigate("/list-of-completed-exams?quiz_id=" + record['key'])}
                        >
                            {text}
                        </a>
                    )
                },
            ],
            data: [
                [
                    {
                        key: 2,
                        name: "Đề ôn số 1",
                        questionNumber: "20 câu",
                        score: "10",
                        time: "30 phút",
                        numberOfAttempts: "3",
                        date: "8/4/2024",
                        levelOfCompletation: "100%",
                        status: "Xem chi tiết"
                    }
                ]
            ]
        }
    return (
        <>
            <MainLayout>
                <List list={list} listTitle={'Lịch sử'} emptyMessage={"Không có đề ôn"} />
            </MainLayout>
        </>
    )
}