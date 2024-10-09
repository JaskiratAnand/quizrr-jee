import React from 'react';
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import prisma from "@/db/index";

interface Results {
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
}

const getResults = async () => {
    const session = await getServerSession(authOptions);

    const results: Results[] = await prisma.testResult.findMany({
        where: {
            userId: session?.user?.id
        },
        select: {
            id: true,
            testId: true,
            result: true,
            test:{
                select: {
                    title: true
                }
            },
            attemptDate: true,
            _count: {
                select: {
                    answers: true
                }
            }
        }
    })

    return results;
}

function timeFormater (date: Date): string {
    const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'short', 
        day: '2-digit' 
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

export default async function Results () {
    const results = await getResults();

    return <div className="p-5">
        <header>
            <h1 className="my-5 text-3xl font-medium">Your past test <span className='text-blue-500'>results</span></h1>
        </header>

        <div>
            <div className="w-full pt-10">
                <div className="pt-2">
                    {results && results.map(result => (
                        <div key={result.id} className="py-4 px-10 m-2 font-medium text-lg flex flex-col w-full border border-neutral-400 rounded-lg gap-2 bg-neutral-900 hover:bg-blue-500 hover:font-bold">
                            <div className="text-xl">{result.test.title}</div>
                            <div className="flex flex-row gap-4 text-sm">
                                <p>Total Question(s): {result._count.answers}</p>
                                <p>Correct Answers: {result.result}</p>
                                <p>Percentage: {result.result && (result.result / result._count.answers) * 100}%</p>
                                <p>Attempted on: {timeFormater(result.attemptDate)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
}
