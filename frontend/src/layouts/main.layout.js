import React from 'react'

import GoogleLoginButton from '../components/buttonLoginGoogle.component'
export default function MainLayout({children}) {
    return (
        <>
            <GoogleLoginButton/>
            {children}
        </>
    )
}