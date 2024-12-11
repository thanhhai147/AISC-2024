import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import '../assets/css/questionList.page.css';
import MainLayout from "../layouts/main.layout";
import SimpleTable from "../components/simpleTable.component"; // Sử dụng component mới
import Button from "../components/button.component";
import CheckBox from "../components/checkBox.component";
import SetupExamPopup from "../components/setupExamPopup.component";
import QuestionAPI from "../api/question.api";
import QuizzesAPI from "../api/quizzes.api";
import { useAuth } from "../context/authentication.context";

export default function QuestionBankPage() {
    const navigate = useNavigate();
    const { userId } = useAuth()
    const [questionBanks, setQuestionBanks] = useState([]);
    const [listData, setListData] = useState([])
    //QUẢN LÝ CHECKBOX
    // Quản lý trạng thái của checkbox
    const [selectedItems, setSelectedItems] = useState({})
    //QUẢN LÝ POPUP SETUP EXAM
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    useEffect(() => {
        const fetchQuestionBanks = async () => {
            try {
                const response = await QuestionAPI.getAllQuestionBank(userId);
                const data = await response.json()
                setQuestionBanks(data.data); // Cập nhật dữ liệu vào state
            } catch (error) {
                console.error("Error fetching question banks:", error);
            }
        };
        fetchQuestionBanks();
    }, [userId]);

    // const listData = [];
    useEffect(() => {
        let updatedListData = []
        let updatedSelectedItems = {}
        questionBanks.forEach((questionBank, index) => {
            updatedListData.push({
                key: index + 1,
                index: `${index + 1}`,
                name: questionBank["title"],
                date: questionBank["create_date"],
                detail: "Xem chi tiết",
                status: "Xoá",
                questionBankID : questionBank["question_bank_id"]
            });
            updatedSelectedItems[questionBank["question_bank_id"]] = false
        });
        setListData(updatedListData)
        setSelectedItems(updatedSelectedItems)
    }, [questionBanks])

    // Hàm xử lý khi thay đổi trạng thái checkbox
    const handleCheckboxChange = (questionBankID) => {
        setSelectedItems(prevState => ({
            ...prevState, // Copy previous state
            [questionBankID]: !prevState[questionBankID], // Update specific key
        }));
    };
    

    // Hàm xử lý "Bỏ chọn"
    const handleDeselectAll = () => {
        setSelectedItems(prevState => {
            const updatedItems = {};
            Object.keys(prevState).forEach(key => {
                updatedItems[key] = false; // Set all to false
            });
            return updatedItems;
        });
    };
    
    const handleOpenPopup = () => {
        setIsPopupVisible(true);
    };

    const handleClosePopup = () => {
        setIsPopupVisible(false);
    };

    const handleOpenCreateExamPopup = () => {
        if (Object.values(selectedItems).every(value => value === false)) {
            return Swal.fire({
                position: "center",
                icon: "error",
                title: "Tạo đề ôn thất bại",
                text: "Vui lòng chọn bộ câu hỏi",
                showConfirmButton: false,
                timer: 1500
            })
        }
        handleOpenPopup()
    }
    
    const handleCreateExam = (examName, examTime) => {
        if (!examName || !examTime) {
            return Swal.fire({
                position: "center",
                icon: "error",
                title: "Tạo đề ôn thất bại",
                text: "Vui lòng nhập tên đền ôn và thời gian",
                showConfirmButton: false,
                timer: 1500
            })
        }

        let questionIds = []
        const fetchQuestions = Object.keys(selectedItems).map(questionBankID => {
            if (selectedItems[questionBankID]) {
                return QuestionAPI.getDetailedQuestionBank(questionBankID)
                .then(response => response.json())
                .then(data => {
                    if (data?.success) {
                        return data?.data.map(question => question?.question_id)
                    } else {
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: "Tạo đề ôn thất bại",
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
                        title: "Tạo đề ôn thất bại",
                        text: error?.message,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    return null
                })
            }
        })
        
        Promise.all(fetchQuestions)
        .then(response => {
            if (response) {
                response.forEach(responseQuestionIds => {
                    questionIds = questionIds.concat(responseQuestionIds)
                })
            }
        })
        .then(() => {
            questionIds = new Set(questionIds)
            QuizzesAPI.createQuiz(userId, examName, examTime, [...questionIds])
            .then(response => response.json())
            .then(data => {
                if(data?.success) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Tạo đề ôn thành công",
                        showConfirmButton: false,
                        timer: 1500
                    })
                    .then(() => {
                        setIsPopupVisible(false)
                        navigate("/exam")
                    })
                } else {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Tạo đề ôn thất bại",
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
                    title: "Tạo đề ôn thất bại",
                    text: error?.message,
                    showConfirmButton: false,
                    timer: 1500
                })
            })
        })
        .catch(error => {
            console.error(error)
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Tạo đề ôn thất bại",
                text: error?.message,
                showConfirmButton: false,
                timer: 1500
            })
        })
    };

    const columns = [
        {
            title: "Thứ tự",
            dataIndex: "index",
            key: "index",
            align: "center",
            render: (text, record) => {
                return (
                    <span className="check-box black-color">
                        <CheckBox
                            checked={selectedItems[record?.questionBankID] || false}
                            onChange={() => handleCheckboxChange(record?.questionBankID)}
                        />
                        <span>{record.key}</span>
                    </span>
                )
            },
        },
        {
            title: "Tên bộ câu hỏi",
            dataIndex: "name",
            key: "name",
            align: "center",
        },
        {
            title: "Ngày tạo",
            dataIndex: "date",
            key: "date",
            align: "center",
        },
        {
            title: "Chi tiết",
            dataIndex: "detail",
            key: "detail",
            align: "center",
            render: (text, record) => (
                <a
                    className="link-effect black-color"
                    onClick={() =>
                        navigate(
                            "/question-bank-detail?ques_bank_id=" + record.questionBankID,
                            { state: { title: record.name } }
                        )
                    }
                >
                    {text}
                </a>
            ),
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            align: "center",
            render: (text) => (
                <span className="d-flex flex-row align-items-center justify-content-center">
                    <Button type="warning" size="small">
                        {text}
                    </Button>
                </span>
            ),
        },
    ];

    return (
        <MainLayout>
            <SimpleTable
                columns={columns}
                data={listData}
                tableTitle={"Danh sách bộ câu hỏi"}
                emptyMessage={"Không có câu hỏi nào"}
            />
            <span
                className="d-flex flex-row align-items-center justify-content-end"
                style={{ paddingRight: "65px", paddingTop: "20px" }}
            >
                <Button
                    type="warning"
                    size="small"
                    onClick={handleDeselectAll}
                >
                    Bỏ chọn
                </Button>
                <span className="ml-1"></span>
                <Button 
                    type="primary" 
                    size="small" 
                    onClick={handleOpenCreateExamPopup}
                >
                    Tạo đề ôn
                </Button>
            </span>

            <SetupExamPopup
                isVisible={isPopupVisible}
                onClose={handleClosePopup}
                onCreate={handleCreateExam}
            />
        </MainLayout>
    );
}
