import React from "react";
import TextInput from "./textInput.component";
import '../assets/css/multipleChoices.css'

const basicChoice = (label, context) => {
    return (
        <div className="choice font-family-regular">
            <div className="choice-label mr-2">{label}.</div>
            <div>{context}</div>
        </div>
    )
}

const examChoice = (label, context) => {
    return (
        <div className="choice font-family-regular exam-margin-bottom">
            <div className="choice-label choice-label-exam">{label}</div>
            <div className="choice-exam">{context}</div>
        </div>
    )
}

const editChoice = (label, context) => {
    return (
        <div className="edit-margin-top">
            <TextInput 
                uneditable={label + ". "}
                defaultValue={context}
            /> 
        </div> 
    )
}

export default function MultipleChoices({type, A, B, C, D}) {
    return (
        <>
            <div className="multiple-choices">
                {
                    type === 'exam' ? 
                    examChoice('A', A) :
                    type === 'edit' ?
                    editChoice('A', A) :
                    basicChoice('A', A)
                }
                {
                    type === 'exam' ? 
                    examChoice('B', B) :
                    type === 'edit' ?
                    editChoice('B', B) :
                    basicChoice('B', B)
                }
                {
                    type === 'exam' ? 
                    examChoice('C', C) :
                    type === 'edit' ?
                    editChoice('C', C) :
                    basicChoice('C', C)
                }
                {
                    type === 'exam' ? 
                    examChoice('D', D) :
                    type === 'edit' ?
                    editChoice('D', D) :
                    basicChoice('D', D)
                }
            </div>
        </>
    )
}