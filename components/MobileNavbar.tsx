import Link from "next/link";
import SignOutButtonComponent from "./SignOutButtonComponent";
import {
  FaRegCompass,
  FaPalette,
  FaAddressCard,
  FaBookmark,
  FaTools,
  FaFeatherAlt,
} from "react-icons/fa";

import { AiOutlineMenu } from "react-icons/ai";

export default function MobileNavbar() {
  return (
    <header className="max-lg_mobile:flex fixed bottom-0 z-10 hidden w-full border-t-2 border-white bg-neutral-900 bg-opacity-95 px-2 py-2">
      <nav className="w-full">
        <ul className="flex w-full items-center justify-around">
          <li>
            <Link
              href="/explore"
              className="flex flex-col items-center justify-center gap-1"
            >
              <AiOutlineMenu />
              <p className="">Menu</p>
            </Link>
          </li>
          <li>
            <Link
              href="/explore"
              className="flex flex-col items-center justify-center gap-1"
            >
              <FaRegCompass />
              <p className="">Explore</p>
            </Link>
          </li>
          <li>
            <Link
              href="/vision"
              className="flex flex-col items-center justify-center gap-1"
            >
              <FaFeatherAlt />
              <p className="">Vision</p>
            </Link>
          </li>
          <li>
            <Link
              href="/account"
              className="flex flex-col items-center justify-center gap-1"
            >
              <FaAddressCard />
              <p className="">Account</p>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
