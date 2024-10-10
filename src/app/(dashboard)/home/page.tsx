import React from 'react';
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import prisma from "@/db/index";
import YourPurchases from '@/components/YourPurchases';
import OtherSeries from '@/components/OtherSeries';

interface PurchasedTestSeries {
    purchases: {
        createdAt: Date,
        testSeries: {
            id: string,
            title: string,
            description: string
        }
    }[]
}

interface Purchases {
    id: string,
    title: string,
    description: string,
    createdAt: Date
}

const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return 'Good Morning';
    } else if (currentHour < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
};

const getPurchasedTestSeries = async () => {
    const session = await getServerSession(authOptions);

    const purchasedSeries: PurchasedTestSeries | null = await prisma.user.findFirst({
        where: { id: session?.user?.id },
        select: {
            purchases: {
                select: {
                    testSeries: {
                        select: {
                            id: true,
                            title: true,
                            description: true
                        }
                    },
                    createdAt: true
                },
            }
        }
    })

    if (!purchasedSeries) {
        return [];
    }

    const purchases: Purchases[] = purchasedSeries?.purchases.map(p => ({
        id: p.testSeries.id,
        title: p.testSeries.title,
        description: p.testSeries.description,
        createdAt: p.createdAt 
    }));

    return purchases;
}

const getTestSeries = async () => {
    const testSeries = await prisma.testSeries.findMany();
    return testSeries;
}

export default async function Home () {
    const session = await getServerSession(authOptions);
    const name = session?.user?.name;
    const greeting = getGreeting();
    const [purchases, testSeries] = await Promise.all([getPurchasedTestSeries(), getTestSeries()]);
    const filteredTestSeries = testSeries.filter(ts => !purchases.find(p => p.id === ts.id));

    return <div className='p-5'>
        <div className='my-5 text-3xl font-medium'>
            {greeting}, <span className='text-blue-500'>{name}</span>
        </div>

        <YourPurchases purchases={purchases} />
        <OtherSeries testSeries={filteredTestSeries} />
    </div>
}
