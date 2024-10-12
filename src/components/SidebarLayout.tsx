import React from "react"
import HamburgerMenuPage from "./ui/HamburgerMenu"
import Sidebar from "./ui/Sidebar"

export default function SidebarLayout({ children }: {
    children: React.ReactNode
}) {

    return (
        <>
            <HamburgerMenuPage />
            <Sidebar />

            <div className="p-2 lg:ml-56">
                {children}        
            </div>
        </>
    )
}


