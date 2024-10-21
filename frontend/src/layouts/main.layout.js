import React from 'react'

import GoogleLoginButton from '../components/buttonLoginGoogle.component'
import BackButton from '../components/buttonBack.component'
export default function MainLayout({children}) {
    return (
        <>
            <GoogleLoginButton/>
            <BackButton/>
            {children}
        </>
    )
}