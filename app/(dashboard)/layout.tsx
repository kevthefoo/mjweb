import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import "@/app/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from '@clerk/themes'

export const metadata: Metadata = {
    title: "Meet Johnny",
    description: "Generate high quality images with Meet Johnny",
};

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider
            appearance={{
                baseTheme: dark,
            }}
        >
            <html lang="en">
                <body className="antialiased flex h-screen w-screen">
                    <Navbar />
                    <main className="w-full h-full">{children}</main>
                </body>
            </html>
        </ClerkProvider>
    );
}
