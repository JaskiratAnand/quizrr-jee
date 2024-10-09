
import React from "react"
import AuthButton from "./AuthButton";

export default function Navbar() {

    return <>
        <header className="z-[100]">       
            <nav className="max-w-screen-xl flex items-center justify-between p-6 mx-auto lg:px-8">
                <div className="flex lg:flex-1">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        Quizrr<span className="text-blue-500">JEE</span>
                    </span>
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <AuthButton />
                </div>
            </nav>
        </header>
    </>
}