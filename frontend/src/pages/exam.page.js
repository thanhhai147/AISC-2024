import React from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../layouts/main.layout";
import FunctionBoxes from "../components/functionBoxes.component";
import List from "../components/list.component";
import Button from "../components/button.component";

export default function ExamPage() {
    const navigate = useNavigate()

    const list = {
        sections: ["Tất cả đề ôn ", "Đề đã làm", "Đề đang làm", "Đề chưa làm"],
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
                title: "Số lượng câu hỏi",
                dataIndex: "questionNumber",
                key: "questionNumber",
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
                title: "Ngày tạo",
                dataIndex: "date",
                key: "date",
                align: "center",
                filtered: true
            },
            {
                title: "Chi tiết",
                dataIndex: "detail",
                key: "detail",
                align: "center",
                render: (text, record) => (
                    <a 
                        className="link-effect black-color"
                        onClick={() => navigate("/exam-detail?quiz_id=" + record['key'])}
                    >
                        {text}
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
                        <Button type="warning" size="small">
                            {text.split("-")[0]}
                        </Button>
                        <span className="ml-1"></span>
                        <Button 
                            type="success" 
                            size="small" 
                            onClick={() => navigate("/take-exam?")}
                        >
                            {text.split("-")[1]}
                        </Button>
                    </span>
                )
            },
        ],
        data: [
            [
                {
                    key: 1,
                    name: "Đề ôn số 1",
                    questionNumber: "20 câu",
                    time: "30 phút",
                    date: "9/4/2024",
                    detail: "Xem chi tiết",
                    status: "Xóa-Ôn tập"
                },
                {
                    key: 2,
                    name: "Đề ôn số 1",
                    questionNumber: "20 câu",
                    time: "30 phút",
                    date: "8/4/2024",
                    detail: "Xem chi tiết",
                    status: "Xóa-Ôn tập "
                }
            ]
        ]
    }
    return (
        <>
            <MainLayout>
                <FunctionBoxes activities={[{'title': 'Đề ôn số 1', 'time': '9/4/2024 12:30', 'navigateTo': '/exam-detail?quiz_id=1'}]} />
                <List list={list} listTitle={'Danh sách đề ôn'} emptyMessage={"Không có đề ôn"} />
            </MainLayout>
        </>
    )
}