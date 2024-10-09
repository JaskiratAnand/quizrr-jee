import { getServerSession } from "next-auth"
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

export const GET = async () => {

    try {
        const session = await getServerSession(authOptions);
        if (session && session.user) {
            return NextResponse.json({
                user: session.user
            }, { 
                status: 200 
            });
        } else {
            return NextResponse.json({
                message: "You are not logged in"
            }, {
                status: 403
            })
        }
    } catch (err) {
        return NextResponse.json({
            message: "You are not logged in",
            error: err
        }, {
            status: 403
        })
    }
}