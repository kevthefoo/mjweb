import type { Metadata } from "next";
import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import MobileNavbar from "@/components/MobileNavbar";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import ResToaster from "@/components/ResToaster";

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
        <body className="relative flex h-screen w-screen antialiased">
          <ResToaster />
          <Navbar />
          <MobileNavbar />
          <main className="h-full w-full">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
