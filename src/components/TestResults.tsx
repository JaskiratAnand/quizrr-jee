"use client"
import { memo } from "react";

function timeFormater (date: Date): string {
    const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'short', 
        day: '2-digit' 
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

const TestResults = memo(({ results }: {
    results: {
        id: string,
        testId: string,
        result: number | null,
        attemptDate: Date,
        test: {
            title: string
        },
        _count: {
            answers: number
        }
    }[]
}) => {

    if (results.length === 0) {
        return <div>
            <div className="w-full pt-5">
                <div className="pt-2">
                    <div className="py-4 px-10 m-2 font-medium text-lg flex flex-col w-full border border-neutral-400 rounded-lg gap-2 bg-neutral-900 hover:bg-blue-500 hover:font-bold">
                        <div className="text-xl">No Results Found</div>
                    </div>
                </div>
            </div>
        </div>
    }
    
    return <>
        <div className="w-full pt-10">
            <div className="pt-2">
                {results && results.map(result => (
                    <div key={result.id} className="py-4 px-10 m-2 font-medium text-lg flex flex-col w-full border border-neutral-400 rounded-lg gap-2 bg-neutral-900 hover:bg-blue-500 hover:font-bold">
                        <div className="text-xl">{result.test.title}</div>
                        <div className="flex flex-row gap-4 text-sm">
                            <p>Attempted on: {timeFormater(result.attemptDate)}</p>
                            <p>Total Question(s): {result._count.answers}</p>
                            <p>Correct Answers: {result.result}</p>
                            <p>Percentage: {result.result && (result.result / result._count.answers) * 100}%</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>
});
TestResults.displayName = 'TestResults';

export default TestResults;