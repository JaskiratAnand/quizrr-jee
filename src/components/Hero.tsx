"use client"

import Button from './Button';
import Image from "next/image";
import quizrrImage from './img/quizrr.png';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { memo, useCallback } from 'react';

const Hero = memo(() => {
    const router = useRouter();
    const session = useSession();
    const user = session.data?.user;

    const handleHome = useCallback(() => {
        router.push("/home");
    }, [router]);

  return (
    <div className="relative isolation-auto px-6 pt-14 lg:px-8">
        <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
            <div
                style={{
                clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-60 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
        </div>
        
        <div className="mx-auto max-w-2xl py-20 sm:py-24 lg:py-28">
            <div className="text-center">
                <Image 
                    src={quizrrImage} 
                    alt="quizrr-img"
                    className="mx-auto my-0 p-5 w-56" 
                />
                <h1 className="text-3xl font-bold tracking-normal sm:text-4xl text-center">
                    Prepare with Test Series for
                    <p className='text-3xl pt-4 text-blue-500 sm:text-6xl'>JEE Mains/Advanced</p>
                </h1>
                <p className="mt-6 text-lg leading-8 text-center">
                    Crack upcoming IIT JEE Main & Advanced and other competitive exams with test series designed according to latest pattern of exams!
                </p>
                <div className="mt-10 flex items-center justify-center">
                    {user && <Button title='Go to Home page' className={"w-48"} onClick={() => handleHome()} />}
                </div>
            </div>
        </div>

        <div
            aria-hidden="true"
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
            <div
                style={{
                clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
                className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-60 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            />
        </div>
    </div>
  )
});
Hero.displayName = 'Hero';

export default Hero;