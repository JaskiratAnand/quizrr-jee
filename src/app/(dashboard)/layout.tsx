import React from "react";
import SidebarLayout from "@/components/SidebarLayout";

export default function Layout({ children }: {
    children: React.ReactNode;
}) {
    return (
        <>
            <SidebarLayout>
                {children}
            </SidebarLayout>
        </>
    )
}
