import React  from 'react'

import BoxSort from '../components/boxSort.component'

export default function MainLayout({children}) {
    return (
        <>  
            <BoxSort />
            {children}
        </>
    )
}