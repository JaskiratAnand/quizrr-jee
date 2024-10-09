import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import ProfileCard from "@/components/ProfileCard";
import prisma from "@/db/index";

const getCreatedAt = async () => {
    const session = await getServerSession(authOptions);
    const createdAt = await prisma.user.findFirst({
        where: { id: session?.user?.id },
        select: {
            createdAt: true
        }
    })
    if (!createdAt) {
        return null;
    }
    return createdAt.createdAt;
}

export default async function Profile () {
    const session = await getServerSession(authOptions);
    const name = session?.user?.name;
    const email = session?.user?.email;
    const createdAt = await getCreatedAt().then(date => date?.toLocaleString().split(',')[0]);

    return <>
        <ProfileCard name={name} email={email} createdOn={createdAt? createdAt: ""} />
    </>
}