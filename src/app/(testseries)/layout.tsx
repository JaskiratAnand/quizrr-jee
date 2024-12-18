import Navbar from "@/components/ui/Navbar";

export default function Layout ({ children }: {
    children: React.ReactNode;
}) {
  return <>
        <Navbar />
        <div>
            { children }
        </div>
    </>
}