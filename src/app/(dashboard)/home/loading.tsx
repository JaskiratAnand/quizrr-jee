
export default function Loading() {
    return (
        <div className="p-5">
            <div className="my-5 animate-pulse">
                <div className="h-9 w-3/4 bg-neutral-900 rounded mb-2"></div>
            </div>

            <div className="mt-5 pt-5 px-3">
                <div className="text-xl font-medium mb-2 animate-pulse">
                    <div className="h-8 w-2/3 bg-neutral-800 rounded mb-2"></div>
                </div>
                <div className="flex flex-row overflow-scroll scroll my-4">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="m-2 min-w-72 w-72 px-3 py-5 h-60 bg-neutral-800 rounded animate-pulse"></div>
                    ))}
                </div>
            </div>

            <div className="mt-5 pt-5 px-3">
                <div className="text-xl font-medium mb-2 animate-pulse">
                    <div className="h-8 w-2/3 bg-neutral-800 rounded mb-2"></div>
                </div>
                <div className="flex flex-row overflow-scroll scroll my-4">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="m-2 min-w-72 w-72 px-3 py-5 h-60 bg-neutral-800 rounded animate-pulse"></div>
                    ))}
                </div>
            </div>
        </div>
    );
};
