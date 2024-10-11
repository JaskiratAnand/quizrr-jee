"use client";
import { memo, useCallback } from 'react';
import Card from './ui/Card'
import { useRouter } from 'next/navigation';

const YourPurchases = memo(({ purchases }: {
    purchases: {
        id: string;
        title: string | undefined;
        description: string | null | undefined;
        createdAt: Date;
    }[]
}) => {
    const router = useRouter();

    const timeFormater = useCallback((date: Date): string => {
        const options: Intl.DateTimeFormatOptions = { 
            year: 'numeric', 
            month: 'short', 
            day: '2-digit' 
        };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    }, []);

    const handleClick = useCallback((id: string) => {
        router.push(`/testseries/${id}`)
    }, [router]);

    if (purchases.length === 0) {
        return (
            <div className='mt-5 pt-5 px-3'>
                <h1 className='text-2xl text-medium'>Your Purchases</h1>
                <div className='flex flex-row overflow-scroll scroll my-4  '>
                    <div className='m-2 min-w-72 w-72 px-3 py-5 border border-neutral-400 bg-neutral-900 rounded-lg'>
                        <Card 
                            title='No Purchases Yet' 
                            description='You have not purchased any series yet.'
                        />
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className='mt-5 pt-5 px-3'>
            <h1 className='text-2xl text-medium'>Your Purchases</h1>
            <div className='flex flex-row overflow-scroll scroll my-4'>
                {purchases.map(p => (
                    <div key={p.id} className='m-2 min-w-72 w-72 px-3 py-5 border border-neutral-400 bg-neutral-900 rounded-lg'>
                        <Card 
                            title={p.title || ""} 
                            description={p.description || ""}
                            purchasedOn={timeFormater(p.createdAt)}
                            buttonTitle='View Series'
                            onClick={() => handleClick(p.id)}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
});
YourPurchases.displayName = 'YourPurchases';

export default YourPurchases;