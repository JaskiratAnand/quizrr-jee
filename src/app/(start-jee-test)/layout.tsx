
export default function Layout ({ children }: {
    children: React.ReactNode;
}) {
  return <div className='max-w-full bg-white text-black px-5 overflow-hidden'>
        <div>
            { children }
        </div>
    </div>
}