import type { Metadata } from "next";
import "@/app/globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
    title: "Meet Johnny",
    description: "Generate high quality images with Meet Johnny",
};

export default function LandingPageLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className="antialiased h-screen w-screen">
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
