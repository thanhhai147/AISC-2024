import React, { useState, useEffect } from "react";
import "../assets/css/setupExamPopup.css";
import Button from "./button.component";
import TextInputTitle from "./textInput&Title.component";
import { useAuth } from "../context/authentication.context";
import ListItems from "./listItems.component";
import QuizzesAPI from "../api/quizzes.api";
export default function SetupExamPopup({
    handleAddQuestions,
    selectedQuestions,
    isVisible,
    onClose,
    onCreate,
    popupTitle = "Vui lòng đặt tên đề ôn",  // Default title
    nameLabel = "Tên đề ôn: ",              // Default name label
    timeLabel = "Thời gian (phút): ",              // Default time label
    placeholderName = "Đề ôn số 1...",     // Default placeholder for name input
    placeholderTime = "30 phút",           // Default placeholder for time input
    buttonCancelText = "Thoát",            // Default text for cancel button
    buttonCreateText = "Tạo đề ôn"         // Default text for create button
}) {
    const [examName, setExamName] = useState("");
    const [examTime, setExamTime] = useState("");
    const { userId } = useAuth(); // Lấy userId từ context
    const [allQuestionQuiz, setAllQuestionQuiz] = useState([]);
    const [allQuestionQuizID, setAllQuestionQuizID] = useState([]);
    useEffect(() => {
        QuizzesAPI.getAllQuiz(userId)
        .then(response => response.json())
        .then(data => {
            if(data?.success) {
                setAllQuestionQuiz(data?.data?.map(item => (item?.title)))
                setAllQuestionQuizID(data?.data?.map(item => (item?.quiz_id)))
                console.log("Success")

            } else {
                console.log("Error")
            }
        })
        .catch(error => {
            console.log(error)
        })
    }, [userId])
    const handleItemClick = (item, index) => {
        console.log(`Bạn đã click vào: ${item} tại vị trí ${index}`);
    };
    const handleExtraButtonClick = async (item, index) => {
        console.log(`Nút "Thêm" được nhấn với item: ${item}, tại index: ${allQuestionQuizID[index]}`);
        console.log(Object.entries(selectedQuestions).filter(value => value[1]).map(value => value[0]))
        for (const [key, value] of Object.entries(selectedQuestions)) {
            if (value) {
                await QuizzesAPI.addQuestionToQuiz(allQuestionQuizID[index], key)
            }
        }
        handleAddQuestions()
        
    };
    if (!isVisible) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-container">
                <p className="popup-title font-family-semibold primary-color">
                    {popupTitle}
                </p>
                <div className="popup-content">
                    <TextInputTitle
                        title={nameLabel}
                        placeholder={placeholderName}
                        value={examName}
                        onChange={(e) => setExamName(e.target.value)} // Cập nhật giá trị khi thay đổi
                    />

                    <TextInputTitle
                        title={timeLabel}
                        placeholder={placeholderTime}
                        value={examTime}
                        onChange={(e) => setExamTime(e.target.value)} // Cập nhật giá trị khi thay đổi
                    />
                    <ListItems
                        results={allQuestionQuiz}
                        emptyMessage="Không có đề ôn"
                        onItemClick={handleItemClick} // Truyền hàm click cho nút chính
                        onExtraButtonClick={handleExtraButtonClick} // Truyền hàm cho nút "Thêm"
                    />
                </div>
                <div className="popup-actions">
                    <Button type="warning" size="small" onClick={() => {
                        setExamName("")
                        setExamTime("")
                        onClose()
                    }}>
                        {buttonCancelText}
                    </Button>
                    <Button
                        type="primary"
                        size="small"
                        onClick={() => onCreate(examName, examTime)}
                    >
                        {buttonCreateText}
                    </Button>
                </div>
            </div>
        </div>
    );
}
