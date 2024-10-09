"use client";
import { createPurchase } from '@/lib/actions/createPurchase';
import Card from './Card'

export default function OtherSeries({ testSeries }: {
    testSeries: {
        id: string;
        title: string;
        description: string | null;
    }[]
}) {
    if (testSeries.length === 0) {
        return (
            <div className='mt-5 pt-5 px-3'>
                <h1 className='text-2xl text-medium'>Your Purchases</h1>
                <div className='flex flex-row overflow-scroll scroll my-4  '>
                    <div className='m-2 min-w-72 w-72 px-3 py-5 border border-neutral-400 bg-neutral-900 rounded-lg'>
                        <Card 
                            title='No More Test Series to Purchase' 
                            description='You have purchased all the test series.'
                        />
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className='mt-5 pt-5 px-3'>
            <h1 className='text-2xl text-medium'>Explore Other Series</h1>
            <div className='flex flex-row overflow-scroll scroll my-4  '>
                {testSeries.map(p => (
                    <div key={p.id} className='m-2 min-w-72 w-72 px-3 py-5 border border-neutral-400 bg-neutral-900 rounded-lg'>
                        <Card 
                            title={p.title? p.title: ""} 
                            description={p.description? p.description: ""}
                            buttonTitle='Unlock Series'
                            onClick={async () => {
                                await createPurchase(p.id);
                                window.location.href = "/home";
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}