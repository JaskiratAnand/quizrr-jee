"use client"
import { usePathname, useRouter } from "next/navigation"

export default function SideItem ({ href, title, icon }: {
    href: string;
    title?: string;
    icon?: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const selected = pathname === href;

    return (
        <div 
            className={`flex ${selected ? "text-blue-500" : "text-neutral-400"} items-center cursor-pointer py-3 pl-3 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 group`} 
            onClick={() => {
                router.push(href);
            }}
        >
            <div className="pr-2">
                {icon? icon: null}
            </div>
            <div className={`font-bold ${selected ? "text-blue-500" : "text-neutral-400"}`}>
                {title? title: null}
            </div>
        </div>
    )
}