import React from "react"
import SideItem from "./SideItem"
import AuthButton from "./ui/AuthButton"

export default function Sidebar({ children }: {
    children: React.ReactNode
}) {

    return (
        <>
            <aside className="fixed top-0 left-0 w-56 h-screen" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-neutral-900">
                    <h1 className="text-3xl px-2 py-5 font-medium">
                        Quizrr<span className="text-blue-500">JEE</span>
                    </h1>
                    <div className="flex flex-col justify-between h-[90%]">
                        <div>
                            <SideItem href={"/home"} icon={<HomeIcon />} title="Home" />
                            <SideItem href={"/results"} icon={<ResultsIcon />} title="Results" />
                            <SideItem href={"/profile"} icon={<ProfileIcon />} title="Profile" />
                        </div>
                        <div className="flex w-full justify-center" >
                            <AuthButton />
                        </div>
                    </div>
                </div>
            </aside>

            <div className="p-2 sm:ml-56">
                {children}        
            </div>
        </>
    )
}

function HomeIcon() {
    return (
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clipRule="evenodd"/>
        </svg>
    )
}

function ResultsIcon() {
    return (
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M8 12.732A1.99 1.99 0 0 1 7 13H3v6a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2h-2a4 4 0 0 1-4-4v-2.268ZM7 11V7.054a2 2 0 0 0-1.059.644l-2.46 2.87A2 2 0 0 0 3.2 11H7Z" clipRule="evenodd"/>
            <path fillRule="evenodd" d="M14 3.054V7h-3.8c.074-.154.168-.3.282-.432l2.46-2.87A2 2 0 0 1 14 3.054ZM16 3v4a2 2 0 0 1-2 2h-4v6a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-3Z" clipRule="evenodd"/>
        </svg>
    )
}
function ProfileIcon() {
    return (
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clipRule="evenodd"/>
        </svg>

    )
}