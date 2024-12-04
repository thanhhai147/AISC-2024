import React from 'react'
import '../assets/css/question.css'

import TextInput from './textInput.component'

export default function Question({type, questionNumber, questionContext, setQuestionValue, onChange}) {

    return (
        <>
            <div className='question'>
                {/* <div className='question-number font-family-semibold font-size-normal'>
                    Câu {questionNumber}
                </div> */}
                {
                    type === 'edit' ?
                        <TextInput value={questionContext} setValue={setQuestionValue} boldText={true} onChange={(e) => onChange("questionContext", e.target.value)}/>
                    :
                        <div 
                            className={
                                `
                                    question-context 
                                    font-size-normal
                                    ${type === 'exam' || type === 'review' ? 'font-family-regular' : 'font-family-semibold'}
                                `
                            }
                        >
                            {questionContext}
                        </div>
                }
            </div>
        </>
    )
}