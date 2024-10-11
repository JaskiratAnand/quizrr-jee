import JEETestView from "@/components/JEETestView";
import prisma from "@/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

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

export default async function StartJEETest({ params }: {
    params: { id: string }
}) {
    const session = await getServerSession(authOptions);
    const name = session?.user?.name;
    const email = session?.user?.email;

    const test = await gettest(params.id);
    if (!test) {
        return <div>Test not found</div>
    }
    const questions = test.questions;

    return <>
        <JEETestView user={{name, email}} questions={questions} testId={params.id} />
    </>
}
