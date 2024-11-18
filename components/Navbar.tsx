import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";

export default function Navbar() {
    return (
        <header className="flex flex-col justify-between border-2 border-white h-screen px-8 pt-16 pb-8">
            <Link href="/home">
                <div>Meet Johnny</div>
            </Link>
            <nav className="">
                <ul className="flex flex-col border-2 border-white gap-8">
                    <li>
                        <Link href="/explore">Explore</Link>
                    </li>
                    <li>
                        <Link href="/creation">Creation</Link>
                    </li>
                    <li>
                        <Link href="/gpt">GPT</Link>
                    </li>
                    <li>
                        <Link href="/plans">Plans</Link>
                    </li>
                    <li>
                        <Link href="/account">Account</Link>
                    </li>
                </ul>
            </nav>
            <SignOutButton redirectUrl="/"></SignOutButton>
        </header>
    );
}
