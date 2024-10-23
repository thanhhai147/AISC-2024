import React from 'react'

import Sidebar from '../components/sidebar.component'
import SearchBar from '../components/searchbar.component'
import NavbarAccount from '../components/navbarAccount.component'
import ListItems from '../components/listItems.component'
import FileUploadButton from '../components/fileUploadButton.component'

export default function MainLayout({children}) {
    return (
        <>
            <Sidebar />
            {/* <SearchBar /> */}
            {/* <NavbarAccount /> */}
            {/* <ListItems/> */}
            <FileUploadButton/>
            {children}
        </>
    )
}