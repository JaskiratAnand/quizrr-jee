"use client"
import { memo, useCallback } from "react";
import Button from "./Button"
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
            <div className="p-2 mt-4">
                <Button title={"Start Test"} onClick={() => handleStartTest(id)} />
            </div>
        </header>
    </>
});
TestHeader.displayName = 'TestHeader';

export default TestHeader;