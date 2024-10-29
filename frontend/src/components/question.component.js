import React from 'react'
import '../assets/css/question.css'

import TextInput from './textInput.component'

export default function Question({type, questionNumber, questionContext, setQuestionValue}) {

    return (
        <>
            <div className='question'>
                <div className='question-number font-family-semibold font-size-normal'>
                    Câu {questionNumber}
                </div>
                {
                    type === 'edit' ?
                        <TextInput defaultValue={questionContext} setValue={setQuestionValue} boldText={true}  />
                    :
                        <div 
                            className={
                                `
                                    question-context 
                                    font-size-normal
                                    ${type === 'exam' ? 'font-family-regular' : 'font-family-semibold'}
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