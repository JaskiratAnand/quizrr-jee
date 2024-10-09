import prisma from "@/db";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import { JWT } from "next-auth/jwt";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                name: { label: "Username", type: "text", placeholder: "username (only for first time login)"},
                email: { label: "Email", type: "text", placeholder: "yours@email.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: Record<"name" |"email" | "password", string> | undefined) {
                if (typeof(credentials) === "undefined") {
                    return null;
                }
                const hashedPassword = await bcrypt.hash(credentials.password, 10);
                const existingUser = await prisma.user.findFirst({
                    where: {
                        email: credentials.email
                    }
                });
                if (existingUser) {
                    const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                    if (passwordValidation) {
                        return {
                            id: existingUser.id.toString(),
                            name: existingUser.name,
                            email: existingUser.email
                        }
                    }
                    return null;
                }
                try {
                    const user = await prisma.user.create({
                        data: {
                            name: credentials.name,
                            email: credentials.email,
                            password: hashedPassword
                        }
                    });
                    return {
                        id: user.id.toString(),
                        name: user.name,
                        email: user.email
                    }
                } catch(e) {
                    console.error(e);
                }
                return null;
            },
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        async session({ token, session }: {
            token: JWT,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            session: any,
        }) {
            if (session && session.user){
                session.user.id = token.sub;
            }
            return session;
        }
    }
}
