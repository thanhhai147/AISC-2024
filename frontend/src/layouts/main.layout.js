import React from 'react';

import Sidebar from '../components/sidebar.component';
import NavbarHomePage from '../components/navbarHomePage.component';
import FunctionBoxes from '../components/functionBoxes.component';

export default function MainLayout({ children }) {

    return (
        <>
            <NavbarHomePage />
            <div className='main-container d-flex'>
                <Sidebar />
                <div className='secondary-container'>
                  {children}
                </div>
            </div>
        </>
    );
}