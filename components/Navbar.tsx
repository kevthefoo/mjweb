import Link from "next/link";
import SignOutButtonComponent from "./SignOutButtonComponent";
import {
    FaRegCompass,
    FaPalette,
    FaRobot,
    FaAddressCard,
    FaBookmark,
    FaTools,
} from "react-icons/fa";
import Image from "next/image";
import logo from "@/assets/logo.png";

export default function Navbar() {
    return (
        <header className="flex flex-col justify-between h-screen px-8 pt-16 pb-8 w-1/6 bg-neutral-900	">
            <Link href="/explore" className=" ">
                <div className="flex gap-2">
                    <Image
                        alt="Meet Johnny Logo"
                        width={30}
                        height={30}
                        src={logo}
                        className="rounded-full"
                    />
                    <h1 className="text-2xl">Meet Johnny</h1>
                </div>
            </Link>
            <nav className="">
                <ul className="flex flex-col gap-4">
                    <li className="  rounded-3xl py-2 px-4 hover:bg-neutral-700">
                        <Link
                            href="/explore"
                            className="flex justify-start items-center"
                        >
                            <FaRegCompass />
                            <p className="ml-2 text-xl font-medium">Explore</p>
                        </Link>
                    </li>

                    <li className="  rounded-3xl py-2 px-4 hover:bg-neutral-700">
                        <Link
                            href="/creation"
                            className="flex justify-start items-center"
                        >
                            <FaPalette />
                            <p className="ml-2 text-xl font-medium">Creation</p>
                        </Link>
                    </li>
                    <li className="  rounded-3xl py-2 px-4 hover:bg-neutral-700">
                        <Link
                            href="/gpt"
                            className="flex justify-start items-center"
                        >
                            <FaRobot />
                            <p className="ml-2 text-xl font-medium">GPT</p>
                        </Link>
                    </li>
                    <li className="  rounded-3xl py-2 px-4 hover:bg-neutral-700">
                        <Link
                            href="/plans"
                            className="flex justify-start items-center"
                        >
                            <FaBookmark />
                            <p className="ml-2 text-xl font-medium">Plans</p>
                        </Link>
                    </li>

                    <li className="  rounded-3xl py-2 px-4 hover:bg-neutral-700">
                        <Link
                            href="https://discord.gg/qVVFgB9UPy"
                            target="_blank"
                            className="flex justify-start items-center"
                        >
                            <FaTools />
                            <p className="ml-2 text-xl font-medium">Support</p>
                        </Link>
                    </li>
                    <li className="  rounded-3xl py-2 px-4 hover:bg-neutral-700">
                        <Link
                            href="/account"
                            className="flex justify-start items-center"
                        >
                            <FaAddressCard />
                            <p className="ml-2 text-xl font-medium">Account</p>
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className="h-8 ">
                <SignOutButtonComponent />
            </div>
        </header>
    );
}
