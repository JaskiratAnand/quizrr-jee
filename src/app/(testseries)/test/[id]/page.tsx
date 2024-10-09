import TestHeader from "@/components/TestHeader";
import prisma from "@/db";

interface TestDesc {
    title: string,
    createdAt: Date,
    instructions: string | null,
    _count: {
        questions: number
    }
}

const gettest = async (id: string) => {
    const test: TestDesc | null = await prisma.test.findFirst({
        where: { id: id },
        select: {
            title: true,
            createdAt: true,
            instructions: true,
            _count: {
                select: {
                    questions: true
                }
            }
        }
    })

    if (!test) {
        return null;
    }
    return test;
}

const Instructions = ({ instructions }: {
    instructions: string
}) => {
    return <>
        <div className="mt-4 p-6 border rounded-xl border-neutral-400 items-center bg-neutral-900">
            <h1 className="text-lg  p-2 font-medium">
                Important Instructions
            </h1>
            <p className="text-sm mb-1 px-2 pb-2">
                Please read the following test related instructions:
            </p>
            <hr className="mx-2" />

            <div className="text-sm mt-2 p-2">
                {instructions?.split('.').map((line, i) => {
                    return <p key={i} className="p-2">- {line}</p>
                })}
            </div>
        </div>
    </>
}

function timeFormater (date: Date): string {
    const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'short', 
        day: '2-digit' 
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

export default async function Test({ params }: {
    params: { id: string }
}) {
    const test = await gettest(params.id);
    if (!test) {
        return <div>Test not found</div>
    }

    return <div className="w-full">
        <div className="max-w-screen-xl m-auto">
            <TestHeader 
                id={params.id} 
                title={test.title} 
                questionCount={test._count.questions} 
                createdAt={timeFormater(test.createdAt)}
            />
            {test.instructions && <Instructions instructions={test.instructions} />}
        </div>
    </div>
}