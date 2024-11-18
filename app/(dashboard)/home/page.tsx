import { SignOutButton } from "@clerk/nextjs";

export default async function Home() {
    return (
        <section>
            THis is our home page
            <SignOutButton redirectUrl="/"></SignOutButton>
        </section>
    );
}
