import React from 'react'
import OTP from '../components/OTP.component.js'
import NavbarQuestion from '../components/navbarQuestion.component.js'
import NavbarHomePage from '../components/navbarHomePage.component.js'
import Sidebar from '../components/sidebar.component.js'
import NavbarExam from '../components/navbarExam.component.js'
import FunctionBoxes from '../components/FunctionBoxes.component.js'
import RecentlyActiveBox from '../components/RecentlyActiveBox.component.js'
import GenerateQuestionBox from '../components/GenerateQuestionBox.component.js'
import DocumentUploadBox from '../components/DocumentUploadBox.component.js'
import SearchBar from '../components/searchbar.component.js'
import BackButton from '../components/buttonBack.component.js'
import GoogleLoginButton from '../components/buttonLoginGoogle.component.js'
export default function MainLayout({children}) {
    return (
        <>
            <DocumentUploadBox/>
            <FunctionBoxes/>
            <RecentlyActiveBox/>
            <BackButton/>
            <GoogleLoginButton/>
            <OTP/>
            {children}
        </>
    )
}