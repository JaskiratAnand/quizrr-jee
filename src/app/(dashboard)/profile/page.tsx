import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import ProfileCard from "@/components/ProfileCard";
import prisma from "@/db/index";

const timeFormater = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'short', 
        day: '2-digit' 
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
};

export default async function Profile () {
    const session = await getServerSession(authOptions);
    const name = session?.user?.name;
    const email = session?.user?.email;

    const createdAt = await prisma.user.findFirst({
        where: { id: session?.user?.id },
        select: {
            createdAt: true
        }
    });

    if (!createdAt) {
        return null;
    }
    const date: string = timeFormater(createdAt?.createdAt);

    return <>
        <ProfileCard name={name} email={email} createdOn={date} />
    </>
}