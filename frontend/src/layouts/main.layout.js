import React  from 'react'

import Premium from "../components/premium.component"

export default function MainLayout({children}) {
    return (
        <>
            <Premium 
                period={"1 tháng"} 
                price={"59.000 VND/tháng"} 
                shortDescription={"Trải nghiệm lần đầu 1 tuần với giá 0 VND"} 
                longDescription={[
                    "1 tài khoản Premium",
                    "Hủy bất cứ lúc nào"
                ]}
                VAT={"Không bao gồm thuế GTGT"}
            />
            {children}
        </>
    )
}
