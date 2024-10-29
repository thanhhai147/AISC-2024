import React  from 'react'

import Sidebar from '../components/sidebar.component'
import SearchBar from '../components/searchbar.component'
import NavbarAccount from '../components/navbarAccount.component'

export default function MainLayout({children}) {
    return (
        <>
            <Sidebar />
            <SearchBar />
            <NavbarAccount />
            {children}
        </>
    )
}
