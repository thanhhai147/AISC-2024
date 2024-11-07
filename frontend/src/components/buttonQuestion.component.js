import React from 'react'
import '../assets/css/buttonQuestion.css'

const handleClickDefault = () => {}
const handleMouseEnterDefault = () => {}
const handleMouseLeaveDefault = () => {}

export default function ButtonQuestion({ 
    type='primary', 
    onClick=handleClickDefault, 
    onMouseEnter=handleMouseEnterDefault,
    onMouseLeave=handleMouseLeaveDefault,
    children 
}) {

    let classNameList = [
        'buttonQuestion',
        'font-family-regular'
    ]

    switch(type) {
        case 'primary':
            classNameList.push("primary-button-question")
            break
        case 'secondary':
            classNameList.push("secondary-button-question")
            break
        case 'warning':
            classNameList.push("warning-button-question")
            break
        case 'success':
            classNameList.push("success-button-question")
            break
        default:
            classNameList.push("primary-button-question")
            break
    }

    return (
        <>
            <div 
                className={classNameList.join(" ")} 
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                {children}
            </div>
        </>
    )
}