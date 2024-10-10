"use client"
import React, { memo } from "react"
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AuthButton = memo(({ className }: { 
    className?: string
}) => {
    const session = useSession();
    const router = useRouter();
    const user = session.data?.user;
    const onSignin = () => signIn();
    const onSignout = async () => {
        await signOut();
        router.push("/api/auth/signin");
    }

    return <>
        <button 
            type='button'
            className={`${className} text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}
            onClick={user ? onSignout : onSignin}
        >
            {user ? "Logout" : "Login"}
        </button>
    </>
});
AuthButton.displayName = "AuthButton";

export default AuthButton;
