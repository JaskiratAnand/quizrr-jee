import TestView from "@/components/TestView";
import prisma from "@/db";

interface Test {
    title: string,
    createdAt: Date,
    questions: {
        id: string,
        instructions: string | null,
        qtitle: string,
        imgLink: string | null,
        options: string[],
        type: string,
    }[]
}

const gettest = async (id: string) => {
    const test: Test | null = await prisma.test.findFirst({
        where: { id: id },
        select: {
            title: true,
            createdAt: true,
            questions: {
                select: {
                    id: true,
                    qtitle: true,
                    imgLink: true,
                    options: true,
                    type: true,
                    instructions: true
                }
            }
        }
    })

    if (!test) {
        return null;
    }
    return test;
}

const Header = ({ title }: {
    title: string
}) => {
    return <header className="text-2xl font-medium">
        <h1 className="p-6">Test: <span className="text-3xl text-blue-500">{title}</span></h1>
        <hr />
    </header>
}

export default async function Test({ params }: {
    params: { id: string }
}) {
    const test = await gettest(params.id);
    if (!test) {
        return <div>Test not found</div>
    }
    const questions = test.questions;

    return <>
        <div className="max-w-screen-xl mx-auto">
            <Header title={test.title} />

            <TestView questions={questions} testId={params.id} />
        </div>
    </>
}
