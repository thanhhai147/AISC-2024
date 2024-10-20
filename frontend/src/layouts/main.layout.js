import React from 'react'

import Sidebar from '../components/sidebar.component'
import NavbarQuestion from '../components/navbarQuestion.component'

export default function MainLayout({children}) {
    return (
        <>
            <Sidebar />
            {children}
        </>
    )
}