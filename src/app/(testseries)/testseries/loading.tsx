
export default function Loading () {
    return (
        <div className="max-w-screen-xl w-full mx-auto px-6 py-5">
            <header className="animate-pulse">
                <div className="h-8 bg-neutral-900 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-neutral-900 rounded w-2/3 mb-6"></div>
            </header>
            <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="flex items-center space-x-4 animate-pulse">
                        <div className="h-10 w-10 bg-neutral-800 rounded"></div>
                        <div className="flex-1">
                            <div className="h-4 bg-neutral-800 rounded mb-2"></div>
                            <div className="h-3 bg-neutral-800 rounded w-3/4"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
