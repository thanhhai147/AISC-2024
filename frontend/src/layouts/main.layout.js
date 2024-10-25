import React from 'react'

import Sidebar from '../components/sidebar.component'
import SearchBar from '../components/searchbar.component'
import NavbarAccount from '../components/navbarAccount.component'
import ListItems from '../components/listItems.component'
import FileUploadButton from '../components/fileUploadButton.component'
import ImageUploadButton from '../components/imageUploadButton.component'
import DownloadButton from '../components/downloadButton.component'
import Toggle from '../components/toggle.component'
import Checkbox from '../components/checkBox.component'
import CheckBoxWithText from '../components/checkBoxWithText.component'
export default function MainLayout({children}) {
    return (
        <>
            <Toggle/>
            <Checkbox/>
            <CheckBoxWithText />
            {/* <SearchBar /> */}
            {/* <NavbarAccount /> */}
            {/* <ListItems/> */}
            <FileUploadButton/>
            <ImageUploadButton/>
            <DownloadButton />
            {children}
        </>
    )
}