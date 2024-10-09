"use client";
import Card from './Card'

export default function YourPurchases({ purchases }: {
    purchases: {
        id: string;
        title: string | undefined;
        description: string | null | undefined;
        createdAt: string;
    }[]
}) {
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
            <div className='flex flex-row overflow-scroll scroll my-4  '>
                {purchases.map(p => (
                    <div key={p.id} className='m-2 min-w-72 w-72 px-3 py-5 border border-neutral-400 bg-neutral-900 rounded-lg'>
                        <Card 
                            title={p.title? p.title: ""} 
                            description={p.description? p.description: ""}
                            purchasedOn={p.createdAt}
                            buttonTitle='View Series'
                            onClick={() => window.location.href = `/testseries/${p.id}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}