import React from "react";
import "../assets/css/questionCombo.css"

import Question from "./question.component";
import MultipleChoices from "./multipleChoices.component";
import Answer from "./answer.component";
import Button from "./button.component";

export default function QuestionCombo({ type, questionNumber, questionContext, A, B, C, D, answer }) {
    const basicCombo = () => {
        return (
            <div className="basic-combo">
                <Question 
                    type={'basic'}
                    questionNumber={questionNumber}
                    questionContext={questionContext}
                />
                <MultipleChoices 
                    type={'basic'}
                    A={A}
                    B={B}
                    C={C}
                    D={D}
                />
                <Answer type={'basic'} answer={answer} />
            </div>
        )
    }

    const editCombo = () => {
        return (
            <>
                <Question 
                    type={'edit'}
                    questionNumber={questionNumber}
                    questionContext={questionContext}
                />
                <MultipleChoices 
                    type={'edit'}
                    A={A}
                    B={B}
                    C={C}
                    D={D}
                />
                <Answer type={'edit'} answer={answer} />
            </>
        )
    }

    const preEditCombo = () => {
        return (
            <>
                <Question 
                    type={'pre-edit'}
                    questionNumber={questionNumber}
                    questionContext={questionContext}
                />
                <MultipleChoices 
                    type={'pre-edit'}
                    A={A}
                    B={B}
                    C={C}
                    D={D}
                />
                <Answer type={'pre-edit'} answer={answer} />
                <div className="pre-edit-buttons">
                    <Button type="warning" size="small" status="active">
                        Xóa
                    </Button>
                    <div className="pre-edit-button-spacer"></div>
                    <Button type="success" size="small" status="active">
                        Chỉnh sửa
                    </Button>
                </div>
            </>
        )
    }

    const examCombo = () => {
        return (
            <div className="exam-combo">
                <Question 
                    type={'exam'}
                    questionNumber={questionNumber}
                    questionContext={questionContext}
                />
                <div className="line-with-text">
                    <span className="font-family-light">Chọn một đáp án đúng</span>
                </div>
                <MultipleChoices 
                    type={'exam'}
                    A={A}
                    B={B}
                    C={C}
                    D={D}
                />
            </div>
        )
    }

    return (
        <>
            {
                type === 'basic' ?
                basicCombo() : 
                type === 'edit' ?
                editCombo() :
                type === 'pre-edit' ? 
                preEditCombo() :
                examCombo()
            }
        </>
    )
}