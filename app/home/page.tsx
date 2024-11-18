import { SignOutButton } from "@clerk/nextjs";

export default async function Home() {
    return (
        <main>
            THis is our home page
            <SignOutButton redirectUrl="/"></SignOutButton>
        </main>
    );
}
