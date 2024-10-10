
export default function Loading () {
  return (
    <aside className="fixed top-0 left-0 w-56 h-screen bg-neutral-900 p-4">
      <div className="animate-pulse">
        <div className="h-10 w-3/4 bg-neutral-900 rounded mb-4"></div>
        <div className="flex flex-col justify-between h-[90%]">
          <div>
            <div className="h-10 w-full bg-neutral-800 rounded mb-2"></div>
            <div className="h-10 w-full bg-neutral-800 rounded mb-2"></div>
            <div className="h-10 w-full bg-neutral-800 rounded mb-2"></div>
          </div>
          <div className="flex w-full justify-center">
            <div className="h-10 w-1/2 bg-neutral-800 rounded"></div>
          </div>
        </div>
      </div>
    </aside>
  );
};
