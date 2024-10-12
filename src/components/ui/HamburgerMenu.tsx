"use client"

import { memo, useRef, useState } from "react";
import SideItem from "./SideItem";
import AuthButton from "./AuthButton";
import { HomeIcon, ProfileIcon, ResultsIcon } from "./Icons";

const HamburgerMenuPage = memo(() => {
    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen((prevState) => !prevState);
    };

    return (
        <HamburgerMenu bgColor="bg-neutral-900" textColor="text-white">

            <h1 className="text-3xl px-2 font-medium inline-block pt-1.5 pb-1.5 mr-4 cursor-pointer whitespace-nowrap hover:text-gray-400">
                Quizrr<span className="text-blue-500">JEE</span>
            </h1>

            <HamburgerMenuToggler toggle={toggle} />
            <HamburgerMenuCollapse open={open}>
                <HamburgerMenuNav>
                    <SideItem href={"/home"} icon={<HomeIcon />} title="Home" />

                    <SideItem href={"/results"} icon={<ResultsIcon />} title="Results" />

                    <SideItem href={"/profile"} icon={<ProfileIcon />} title="Profile" />
                    
                    <div className="flex mt-1 justify-center">
                        <AuthButton />
                    </div>
                </HamburgerMenuNav>
            </HamburgerMenuCollapse>
        </HamburgerMenu>
    );
});
HamburgerMenuPage.displayName = "HamburgerMenuPage";

const styles = {
    nav: `block pl-0 mb-0 mt-2`,
    navbar: `lg:hidden font-light shadow py-2 px-4`,
    collapse: `transition-height ease duration-300`,
    toggler: `float-right pt-1.5 text-3xl focus:outline-none focus:shadow`,
};

const HamburgerMenu = memo(({ children, bgColor, textColor }: {
    children: React.ReactNode,
    bgColor: string,
    textColor: string
}) => {
    return (
        <nav className={`${bgColor} ${textColor} ${styles.navbar}`}>{children}</nav>
    );
});
HamburgerMenu.displayName = "HamburgerMenu";

const HamburgerMenuToggler = memo(({ toggle }: {
    toggle: () => void
}) => {
    return (
        <button
            type="button"
            aria-expanded="false"
            aria-label="Toggle navigation"
            className={styles.toggler}
            onClick={toggle}
        >
            &#8801;
        </button>
    );
});
HamburgerMenuToggler.displayName = "HamburgerMenuToggler";

const HamburgerMenuCollapse = memo(({ children, open }: {
    children: React.ReactNode,
    open: boolean
}) => {
    const ref = useRef<HTMLDivElement>(null);

    const inlineStyle = open
        ? { height: ref.current?.scrollHeight, visibility: 'visible', opacity: 1 } as const
        : { height: 0, visibility: 'hidden', opacity: 0 } as const;

    return (
        <div className={styles.collapse} style={inlineStyle} ref={ref}>
            {children}
        </div>
    );
});
HamburgerMenuCollapse.displayName = "HamburgerMenuCollapse";

const HamburgerMenuNav = memo(({ children }: {
    children: React.ReactNode
}) => {
    return <ul className={styles.nav}>{children}</ul>;
});
HamburgerMenuNav.displayName = "HamburgerMenuNav";

export default HamburgerMenuPage;
