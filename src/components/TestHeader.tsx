"use client"
import { memo, useCallback } from "react";
import Button from "./ui/Button"
import { useRouter } from "next/navigation";

const TestHeader = memo(({ id, title, createdAt, questionCount }: {
    id: string,
    title: string,
    createdAt: string,
    questionCount: number
}) => {
    const router = useRouter();

    const handleStartTest = useCallback((id: string) => {
        router.push(`/start-test/${id}`);
    }, [router]);

    const handleStartJEETest = useCallback((id: string) => {
        router.push(`/start-jee-test/${id}`);
    }, [router]);

    return <> 
        <header className="p-6 border mx-4 rounded-xl border-neutral-400 items-center bg-neutral-900">
            <h1 className="text-3xl  p-2 font-semibold text-blue-500" >
                {title}
            </h1>
            <div className="flex flex-row">
                <p className="text-sm pl-2 py-2">
                    {createdAt}
                </p>
                <p className="text-sm pl-1 py-2">
                    Question(s): {questionCount}
                </p>
            </div>
            <div className="p-2 mt-4 flex flex-col gap-2 sm:flex-row sm:gap-0">
                <Button title={"Start Test"} onClick={() => handleStartTest(id)} />
                <Button title={"Start Test JEE Format (unfinished)"} onClick={() => handleStartJEETest(id)} />
            </div>
            <div className="py-2 px-4 text-sm">** use desktop for JEE format test</div>
        </header>
    </>
});
TestHeader.displayName = 'TestHeader';

export default TestHeader;