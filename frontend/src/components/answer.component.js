import React, { useState, useEffect } from "react";
import "../assets/css/answer.css"

export default function Answer({ type, answer }) {
    const [currentAnswer, setCurrentAnswer] = useState(answer)
    const [remainingAnswer, setRemainingAnswer] = useState(['A', 'B', 'C', 'D'])
    const [openChoice, setOpenChoice] = useState(false)
    
    useEffect(() => {
        setRemainingAnswer(prevRemainingAnswer => prevRemainingAnswer.filter(value => value !== currentAnswer))
    }, [currentAnswer])

    const handleClick = (value) => {
        setRemainingAnswer(prevRemainingAnswer => [...prevRemainingAnswer, currentAnswer].sort())
        setCurrentAnswer(value)
    }

    return (
        <>
            <div 
                className={
                    `
                        answer 
                        font-family-semibold 
                        success-color
                        ${type === 'basic' ? 'margin-top-answer-basic' : ''}
                        ${type === 'edit' ? 'answer-edit' : ''}
                        ${type === 'edit' ? 'margin-top-answer-edit' : ''}
                    `
                }
                onClick={() => setOpenChoice(!openChoice)}
            >
                Đáp án: {currentAnswer}
            </div>
            {
                type === 'edit' ?
                <div 
                    className="answer-choice-wrapper" 
                    style={{
                        display: openChoice ? 'block' : 'none'
                    }}
                >
                    <div 
                        className={
                            `
                                answer 
                                font-family-semibold 
                                ${type === 'edit' ? 'answer-choice' : ''}
                            `
                        }
                        onClick={() => handleClick(remainingAnswer[0])}
                    >
                        Đáp án: {remainingAnswer[0]}
                    </div>
                    <div 
                        className={
                            `
                                answer 
                                font-family-semibold 
                                ${type === 'edit' ? 'answer-choice' : ''}
                            `
                        }
                        onClick={() => handleClick(remainingAnswer[1])}
                    >
                        Đáp án: {remainingAnswer[1]}
                    </div>
                    <div 
                        className={
                            `
                                answer 
                                font-family-semibold 
                                ${type === 'edit' ? 'answer-choice' : ''}
                            `
                        }
                        onClick={() => handleClick(remainingAnswer[2])}
                    >
                        Đáp án: {remainingAnswer[2]}
                    </div>
                </div> : null
            }
        </>
    )
}