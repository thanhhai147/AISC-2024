import React from 'react'

import Sidebar from '../components/sidebar.component'

export default function MainLayout({children}) {
    return (
        <>
            <Sidebar />
            {children}
        </>
    )
}