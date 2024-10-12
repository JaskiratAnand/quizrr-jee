import { memo } from "react"
import AuthButton from "./AuthButton"
import SideItem from "./SideItem"
import { HomeIcon, ProfileIcon, ResultsIcon } from "./Icons"

const Sidebar = memo(() => {
    return <>
        <aside className="hidden lg:block fixed top-0 left-0 w-56 h-full" aria-label="Sidebar">
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
    </>
});
Sidebar.displayName = "Sidebar";

export default Sidebar;