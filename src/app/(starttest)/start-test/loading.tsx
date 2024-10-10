
export default function Loading() {
    return (
        <div className="w-full p-6 mx-auto">
            <div className="max-w-screen-xl p-6 mx-auto">    
                <div className="my-5 animate-pulse">
                    <div className="h-9 w-3/4 bg-neutral-900 rounded mb-2"></div>
                </div>

                <div className="animate-pulse">
                    {Array.from({ length: 4 }).map((_, idx) => (
                        <div key={idx} className="w-full mx-auto my-5 p-5 bg-neutral-900 rounded-lg border">
                            <div className="h-6 bg-neutral-800 rounded w-1/4 mb-2"></div>
                            
                            {(idx%3==0) && <div className="h-30 mx-auto bg-neutral-700 rounded mb-3"></div>}

                            <div className="mt-2 mx-2">
                                <div className="h-10 bg-neutral-800 rounded w-3/4 mb-2"></div> 
                                <div className="h-10 bg-neutral-800 rounded w-3/4 mb-2"></div>
                                <div className="h-10 bg-neutral-800 rounded w-3/4 mb-2"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};