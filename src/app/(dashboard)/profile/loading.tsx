
export default function Loading() {
    return (
        <section className="flex font-medium items-center justify-center h-[90vh]">
            <section className="w-96 mx-auto bg-neutral-900 bg-opacity-60 rounded-2xl px-8 py-12 shadow-lg backdrop-blur animate-pulse">
                <div className="mt-3">
                    <div className="h-8 bg-neutral-800 rounded w-3/4 mb-4"></div>
                </div>
                <div className="h-6 bg-neutral-700 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-neutral-700 rounded w-3/4"></div>
            </section>
        </section>
    );
};
