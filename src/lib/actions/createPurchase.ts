"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/db";

export async function createPurchase (seriesId: string) {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    try {
        await prisma.purchase.create({
            data: {
                userId: userId,
                testSeriesId: seriesId
            }
        });
    } catch (err) {
        throw new Error("Error while unlocking series: " + err);
    }
}