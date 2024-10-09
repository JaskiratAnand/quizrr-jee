import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
    title: "Quizrr JEE",
    description: "JEE test series website",
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <Providers>
                <body className={`${poppins.className} antialised`}>
                    {children}
                </body>
            </Providers>
        </html>
    );
}
