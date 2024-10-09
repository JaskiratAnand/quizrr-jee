import TestsList from "@/components/TestsList";
import prisma from "@/db";

interface TestSeries {
    title: string,
    description: string | null,
    tests: {
        id: string,
        title: string,
        _count: {
            questions: number
        }
    }[]
}

const testSeriesDesc = async (testId: string) => {
    const seriesDesc: TestSeries | null = await prisma.testSeries.findFirst({
        where: { id: testId },
        select: {
            title: true,
            description: true,
            tests: {
                select: {
                    id: true,
                    title: true,
                    _count: {
                        select: {
                            questions: true
                        }
                    }
                },
            }
        }
    })

    if (!seriesDesc) {
        return null;
    }

    return seriesDesc;
}

const Heading = ({title, description}: {
    title: string,
    description: string | null
}) => {
    return <header>
        <h1 className="text-4xl font-medium text-blue-500 py-5">{title}</h1>
        {description && <p className="text-lg">{description}</p>}
    </header>
}

export default async function TestSeries ({ params }: {
    params: { id: string } 
}) {
    const testSeries = await testSeriesDesc(params.id);
    if (!testSeries) {
        return <div>Test Series not found</div>
    }
    const tests = testSeries.tests;

    return <>
        <div className="w-full">
            <div className="max-w-screen-xl w-full mx-auto px-6">
                <Heading title={testSeries.title} description={testSeries.description} />
                <TestsList tests={tests} />
            </div>
        </div>
    </>
}