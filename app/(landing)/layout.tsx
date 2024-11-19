import type { Metadata } from "next";
import "@/app/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

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
        <ClerkProvider
            appearance={{
                baseTheme: dark,
            }}
        >
            <html lang="en">
                <body className="antialiased h-screen w-screen">
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
