import React from 'react'
import '../assets/css/buttonQuestion.css'

const handleClickDefault = () => {}
const handleMouseEnterDefault = () => {}
const handleMouseLeaveDefault = () => {}

export default function Button({ 
    type='primary', 
    status='active', 
    onClick=handleClickDefault, 
    onMouseEnter=handleMouseEnterDefault,
    onMouseLeave=handleMouseLeaveDefault,
    children 
}) {

    let classNameList = [
        'button',
        'font-family-extrabold'
    ]

    switch(type) {
        case 'primary':
            classNameList.push("primary-button")
            break
        case 'secondary':
            classNameList.push("secondary-button")
            break
        case 'warning':
            classNameList.push("warning-button")
            break
        case 'success':
            classNameList.push("success-button")
            break
        default:
            classNameList.push("primary-button")
            break
    }

    switch(status) {
        case 'select':
            break
        case 'correct':
            classNameList.push("disabled-button")
            break
        default:
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