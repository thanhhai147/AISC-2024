import React, { useState, useEffect } from "react";
import NavbarAnswerDetail from "../components/navbarAnswerDetail.component";
import BoxQuestion from "../components/boxQuestion.component";
import QuestionCombo from "../components/questionCombo.component";
import "../assets/css/answerDetail.page.css";
import NavbarHomePage from "../components/navbarHomePage.component";
import InforInExamDetails from "../components/inforInExamDetails.component";
import ExamAPI from "../api/exam.api";
export default function AnswerDetail() {    
    const [loading, setLoading] = useState(true); // Trạng thái theo dõi quá trình tải
    const [detailQuizAttempt, getDetailQuizAttempt] = useState([]);
    const urlParams = new URLSearchParams(window.location.search);
    const attemptedId = urlParams.get("attempted_id");
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await ExamAPI.getQuizAttempt(attemptedId);
                const data = await response.json();
                if (response.ok) {
                    console.log('Quiz attempt updated successfully');
                    getDetailQuizAttempt(data.data);
                    
                } else {
                    console.error('Failed to update quiz attempt');
                }
                
            } catch (error) {
                console.error("Error fetching question banks:", error);
            } finally {
                setLoading(false); // Dữ liệu đã được tải xong
            }
        };
        fetchQuestions();
    }, []);
    if (loading) {
        return <p></p>;
    }
    const Name = [
        {
            examName: detailQuizAttempt["title"]
        }
    ];
    
    const ExamInformation =[
        {
            startTime: detailQuizAttempt["attempted_start"], 
            endTime: detailQuizAttempt["attempted_at"], 
            duration: detailQuizAttempt["time_taken"],
            statusExam: "Hoàn tất",
            score: detailQuizAttempt["score"],
        }
    ]
    const questionDatas = []
    detailQuizAttempt?.["questions"]?.forEach((question, i) => {
        questionDatas.push({
            type: 'explanation',  
            questionNumber: i + 1,
            questionContext: question["question_text"],
            A: question["answer_text_A"],
            B: question["answer_text_B"],
            C: question["answer_text_C"],
            D: question["answer_text_D"],
            answer: "", 
            rightAnswer: question["is_correct"], 
            wrongAnswer: question["user_answer"],
            explanation: question["explanation"], 
        })
    });

    const statusQuestions = [];
    for (let i = 0; i < detailQuizAttempt?.["questions"]?.length; i++) {
        statusQuestions.push(
            detailQuizAttempt?.["questions"][i]?.is_correct === detailQuizAttempt?.["questions"][i]?.user_answer ? "success" : "warning"
        );
    }

    return (
    <>
        <NavbarHomePage />
        <div className="navbar-Answer">
            {Name.map((navbar, index) => (
                <NavbarAnswerDetail
                    key={index}
                    examName={navbar.examName}
                />
            ))}
        </div> 

        <div className="exam-content">
            <div className="exam-left">
                <p className="title-boxquestion">Danh sách câu hỏi</p>
                <BoxQuestion questionCount={detailQuizAttempt["number_of_question"]} statusQuestions={statusQuestions} />
            </div>
            
            <div className="exam-right">
                {ExamInformation.map((inf,index) => (
                    <InforInExamDetails
                    key={index}
                    startTime={inf.startTime}
                    endTime={inf.endTime}
                    duration={inf.duration}
                    statusExam={inf.statusExam}
                    score={inf.score}
                    />
                ))}
                {questionDatas.map((question,index) => (
                    <div className="exam-right-content">
                        <QuestionCombo 
                            type={question.type}
                            questionNumber={question.questionNumber}
                            questionContext={question.questionContext}
                            A={question.A}
                            B={question.B}
                            C={question.C}
                            D={question.D}
                            rightAnswer={question.rightAnswer}
                            wrongAnswer={question.wrongAnswer}
                            explanation={question.explanation}  
                        />
                    </div>
                ))}
                
            </div>
        </div>
    </>
    );
}
