import React from 'react'

import Sidebar from '../components/sidebar.component'
import SearchBar from '../components/searchbar.component'

export default function MainLayout({children}) {
    return (
        <>
            <Sidebar />
            <SearchBar />
            {children}
        </>
    )
}