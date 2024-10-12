import React from 'react';
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import prisma from "@/db/index";
import TestResults from '@/components/TestResults';

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

export default async function Results () {
    const results = await getResults();

    return <div className="p-2 lg:pl-5">
        <header>
            <h1 className="my-5 text-3xl font-medium">My past test <span className='text-blue-500'>results</span></h1>
        </header>

        <TestResults results={results} />
    </div>
}
