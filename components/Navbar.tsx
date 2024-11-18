import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import {
    FaRegCompass,
    FaPalette,
    FaRobot,
    FaAddressCard,
    FaBookmark,
    FaTools,
    FaBolt,
} from "react-icons/fa";

export default function Navbar() {
    return (
        <header className="flex flex-col justify-between border-2 border-white h-screen px-8 pt-16 pb-8 w-56">
            <Link href="/home" className="border-2 border-white">
                <div>Meet Johnny</div>
            </Link>
            <nav className="">
                <ul className="flex flex-col border-2 border-white gap-4">
                    <li>
                        <Link
                            href="/explore"
                            className="flex justify-start items-center"
                        >
                            <FaRegCompass />
                            <p className="ml-2">Explore</p>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/features"
                            className="flex justify-start items-center"
                        >
                            <FaBolt />
                            <p className="ml-2">Features</p>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/creation"
                            className="flex justify-start items-center"
                        >
                            <FaPalette />
                            <p className="ml-2">Creation</p>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/gpt"
                            className="flex justify-start items-center"
                        >
                            <FaRobot />
                            <p className="ml-2">GPT</p>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/plans"
                            className="flex justify-start items-center"
                        >
                            <FaBookmark />
                            <p className="ml-2">Plans</p>
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="https://discord.gg/qVVFgB9UPy"
                            target="_blank"
                            className="flex justify-start items-center"
                        >
                            <FaTools />
                            <p className="ml-2">Support</p>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/account"
                            className="flex justify-start items-center"
                        >
                            <FaAddressCard />
                            <p className="ml-2">Account</p>
                        </Link>
                    </li>
                </ul>
            </nav>
            <SignOutButton redirectUrl="/"></SignOutButton>
        </header>
    );
}
