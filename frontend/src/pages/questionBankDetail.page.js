import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import QuizzesAPI from "../api/quizzes.api";
import { useAuth } from "../context/authentication.context";

import '../assets/css/questionDetail.page.css';
import MainLayout from "../layouts/main.layout";
import SimpleTable from "../components/simpleTable.component";
import Button from "../components/button.component";
import CheckBox from "../components/checkBox.component";
import EditQuestionPopup from "../components/editQuestionPopup.component";
import SetupExamPopup from "../components/setupExamPopup.component";
import QuestionAPI from "../api/question.api";

export default function QuestionBankDetailPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { userId } = useAuth()

    // Lấy dữ liệu từ URL query string
    const queryParams = new URLSearchParams(location.search);
    const quesBankID = queryParams.get("ques_bank_id");
    const quesBankName = location.state?.title; 

    const [questions, setQuestions] = useState([]);
    const [listData, setListData] = useState([])
    //QUẢN LÝ CHECKBOX
    // Quản lý trạng thái của checkbox
    const [selectedItems, setSelectedItems] = useState([]);
    //QUẢN LÝ POPUP EDIT QUESTION
    const [showPopup, setShowPopup] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    //QUẢN LÝ POPUP SETUP EXAM
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await QuestionAPI.getDetailedQuestionBank(quesBankID);
                const data = await response.json()
                setQuestions(data.data); // Cập nhật dữ liệu vào state
            } catch (error) {
                console.error("Error fetching question banks:", error);
            }
        };
        fetchQuestions();
    }, [quesBankID]);
    
    useEffect(() => {
        let updatedListData = []
        let updatedSelectedItems = {}
        questions.forEach((question, index) => {
            updatedListData.push({
                key: index + 1,
                question: question["question_text"],
                date: question["create_date"],
                detail: "Xem chi tiết",
                status: "Sửa",
                questionID : question["question_id"]
            });
            updatedSelectedItems[question["question_id"]] = false
        });
        setListData(updatedListData)
        setSelectedItems(updatedSelectedItems)
    }, [questions])
    
    // Hàm xử lý khi thay đổi trạng thái checkbox
    const handleCheckboxChange = (questonId) => {
        setSelectedItems(prevState => ({
            ...prevState, // Copy previous state
            [questonId]: !prevState[questonId], // Update specific key
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
    
    const handleEdit = (key) => {
        setSelectedQuestion(key);
        setShowPopup(true); 
    };
    
    const handleClosePopup = () => {
        setShowPopup(false); 
    };
    
    const handleOpenPopupSetupExam = () => {
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
        setIsPopupVisible(true);
    };

    const handleAddQuestions = () => {
            setIsPopupVisible(false);
            Swal.fire({
                icon: "success",
                title: "Thêm vào bộ câu hỏi thành công!",
                text: "Bạn có thể xem bộ câu hỏi của mình.",
                confirmButtonText: "Xem bộ câu hỏi",
                allowOutsideClick: false, 
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/exam"); 
                }
            });
        };
    const handleClosePopupSetupExam = () => {
        setIsPopupVisible(false);
    };
    
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
        
        QuizzesAPI.createQuiz(userId, examName, examTime, Object.entries(selectedItems).filter(value => value[1]).map(value => value[0]))
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
    };
    
    const columns = [
        {
            title: "Thứ tự",
            dataIndex: "index",
            key: "index",
            align: "center",
            render: (text, record) => (
                <span className="check-box black-color">
                    <CheckBox
                        checked={selectedItems[record?.questionID] || false}
                        onChange={() => handleCheckboxChange(record?.questionID)}
                        />
                    <span>{record.key}</span>
                </span>
            ),
        },
        {
            title: "Câu hỏi",
            dataIndex: "question",
            key: "question",
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
                <p
                    className="link-effect black-color"
                    onClick={() =>
                        navigate(
                            "/question-detail?ques_id=" + record.questionID
                        )
                    }
                >
                    {text}
                </p>
            ),
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            align: "center",
            render: (text, record) => (
                <span className="d-flex flex-row align-items-center justify-content-center">
                    <Button 
                        type="success" 
                        size="small" 
                        onClick={() => handleEdit(record.questionID)}
                        >
                        {text.split("-")[0]}
                    </Button>
                    {/* <span className="ml-1"></span>
                    <Button type="warning" size="small">
                    {text.split("-")[1]}
                    </Button> */}
                </span>
            )
        },
    ];
    
    return (
        <MainLayout>
            <SimpleTable
                columns={columns}
                data={listData}
                tableTitle={quesBankName || "Chi tiết bộ câu hỏi"}
                emptyMessage={"Không có câu hỏi nào"}
            />
            {showPopup && selectedQuestion && (
                <EditQuestionPopup 
                    onClose={handleClosePopup} 
                    onManualEdit={() => navigate("/edit-question?ques_id=" + selectedQuestion)}
                    onChatEdit={() => navigate("/chat-eduvision?ques_id=" + selectedQuestion)}
                />
            )}
            <span
                className="d-flex flex-row align-items-center justify-content-end"
                style={{ paddingRight: "50px", paddingTop: "20px" }}
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
                    onClick={handleOpenPopupSetupExam}
                >
                    Tạo đề ôn
                </Button>
            </span>
            <SetupExamPopup
                isVisible={isPopupVisible}
                onClose={handleClosePopupSetupExam}
                onCreate={handleCreateExam}
                selectedQuestions={selectedItems}
                handleAddQuestions={handleAddQuestions}
            />
        </MainLayout>
    );
}
