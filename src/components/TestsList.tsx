"use client";
import { memo, useCallback } from "react";
import Button from "./ui/Button";
import { useRouter } from "next/navigation";

const TestsList = memo(({tests}: {
    tests: {
        id: string;
        title: string;
        _count: {
            questions: number;
        };
    }[]
}) => {
    
    const router = useRouter();
    const handleTestDescription = useCallback((testId: string) => {
        router.push(`/test/${testId}`);
    }, [router]);

    return <>
        <div className="w-full pt-10">
            <div className="text-2xl font-medium">Tests</div>
            <div className="pt-2">
                {tests.map(test => (
                    <div key={test.id} className="py-4 px-10 m-2 mx-auto font-medium text-lg flex flex-row items-center justify-between w-full border border-neutral-400 rounded-lg gap-6 bg-neutral-900 hover:bg-blue-500 hover:font-bold">
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-center">
                            <div>{test.title}</div>
                            <div className="text-sm">{test._count.questions} Question(s)</div>
                        </div>
                        <Button title="Attempt Now" onClick={() => handleTestDescription(test.id)} />
                    </div>
                ))}
            </div>
        </div>
    </>
});
TestsList.displayName = 'TestsList';

export default TestsList;