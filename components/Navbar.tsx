import Link from "next/link";
import SignOutButtonComponent from "./SignOutButtonComponent";
import {
  // FaRobot,
  FaRegCompass,
  FaPalette,
  FaAddressCard,
  FaBookmark,
  FaTools,
  FaFeatherAlt,
} from "react-icons/fa";
import Image from "next/image";
import logo from "@/assets/logo.png";

export default function Navbar() {
  return (
    <header className="z-10 flex h-screen w-1/6 flex-col justify-between bg-neutral-900 px-8 pb-8 pt-16">
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
          <li className="rounded-3xl px-4 py-2 hover:bg-neutral-700">
            <Link href="/explore" className="flex items-center justify-start">
              <FaRegCompass />
              <p className="ml-2 text-xl font-medium">Explore</p>
            </Link>
          </li>

          <li className="rounded-3xl px-4 py-2 hover:bg-neutral-700">
            <Link href="/creation" className="flex items-center justify-start">
              <FaPalette />
              <p className="ml-2 text-xl font-medium">Creation</p>
            </Link>
          </li>
          {/* <li className="rounded-3xl px-4 py-2 hover:bg-neutral-700">
            <Link href="/gpt" className="flex items-center justify-start">
              <FaRobot />
              <p className="ml-2 text-xl font-medium">GPT</p>
            </Link>
          </li> */}
          <li className="rounded-3xl px-4 py-2 hover:bg-neutral-700">
            <Link href="/vision" className="flex items-center justify-start">
              <FaFeatherAlt />
              <p className="ml-2 text-xl font-medium">Vision</p>
            </Link>
          </li>
          <li className="rounded-3xl px-4 py-2 hover:bg-neutral-700">
            <Link href="/plans" className="flex items-center justify-start">
              <FaBookmark />
              <p className="ml-2 text-xl font-medium">Plans</p>
            </Link>
          </li>

          <li className="rounded-3xl px-4 py-2 hover:bg-neutral-700">
            <Link
              href="https://discord.gg/qVVFgB9UPy"
              target="_blank"
              className="flex items-center justify-start"
            >
              <FaTools />
              <p className="ml-2 text-xl font-medium">Support</p>
            </Link>
          </li>
          <li className="rounded-3xl px-4 py-2 hover:bg-neutral-700">
            <Link href="/account" className="flex items-center justify-start">
              <FaAddressCard />
              <p className="ml-2 text-xl font-medium">Account</p>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="h-8">
        <SignOutButtonComponent />
      </div>
    </header>
  );
}
