
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
                <div className="pt-2">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="px-10 m-2 font-medium text-lg flex flex-col w-full gap-2 py-5 h-8 bg-neutral-800 rounded animate-pulse"></div>
                    ))}
                </div>
            </div>
        </div>
    );
};
