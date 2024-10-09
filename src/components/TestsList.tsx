"use client";
import Button from "./Button";

export default function TestsList({tests}: {
    tests: {
        id: string;
        title: string;
        _count: {
            questions: number;
        };
    }[]
}) {
    return <>
        <div className="w-full pt-10">
            <div className="text-2xl font-medium">Tests</div>
            <div className="pt-2">
                {tests.map(test => (
                    <div key={test.id} className="py-4 px-10 m-2 font-medium text-lg flex flex-row items-center justify-between w-full border border-neutral-400 rounded-lg gap-6 bg-neutral-900 hover:bg-blue-500 hover:font-bold">
                        <div className="flex flex-row gap-6">
                            <div>{test.title}</div>
                            <div>{test._count.questions} Question(s)</div>
                        </div>
                        <Button title="Attempt Now" onClick={() => {
                            window.location.href = `/test/${test.id}`
                        }} />
                    </div>
                ))}
            </div>
        </div>
    </>
}