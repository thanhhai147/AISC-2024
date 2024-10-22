import React from 'react'
import OTP from '../components/OTP.component.js'
import NavbarQuestion from '../components/navbarQuestion.component.js'
export default function MainLayout({children}) {
    return (
        <>
            <OTP/>
            <NavbarQuestion/>

            {children}
        </>
    )
}