import React  from 'react'

import BackButton from '../components/buttonBack.component'
import GoogleLoginButton from '../components/buttonLoginGoogle.component'
import OTP from '../components/OTP.component'
import IconPremium from '../components/iconPremium.component'
import DocumentUploadBox from '../components/documentUploadBox.component'
import FunctionBoxes from '../components/functionBoxes.component'
import RecentlyActiveBox from '../components/recentlyActiveBox.component'
import NavbarHomePage from '../components/navbarHomePage.component'
import NavbarExam from '../components/navbarExam.component'

export default function MainLayout({children}) {
    return (
        <>
            <BackButton />

            {children}
        </>
    )
}
