"use client";

import Link from "next/link";
import {
  FaRegCompass,
  FaPalette,
  FaAddressCard,
  FaBookmark,
  FaTools,
  FaFeatherAlt,
  FaSignOutAlt,
} from "react-icons/fa";

import { SignOutButton } from "@clerk/nextjs";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";

export default function MobileNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed bottom-0 z-10 hidden w-full border-t-2 border-white bg-neutral-900 bg-opacity-95 px-2 py-2 max-lg_mobile:flex">
      <nav className="w-full">
        <ul className="flex w-full items-center justify-around">
          <li>
            <div
              className="flex flex-col items-center justify-center gap-1 cursor-pointer"
              onClick={openMenu}
            >
              <AiOutlineMenu />
              <p className="">Menu</p>
            </div>
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
      {isMenuOpen && (
        <div className="fixed bottom-0 left-0 right-0 flex h-1/3 w-full flex-col items-center justify-center rounded-t-3xl bg-neutral-700 bg-opacity-95">
          <div className="absolute right-0 top-0 mr-4 mt-4 cursor-pointer" onClick={closeMenu}>
            X
          </div>

          <ol className="flex flex-col gap-4">
            <li>
              <Link
                href="/creation"
                className="flex items-center justify-start"
                onClick={closeMenu}
              >
                <FaPalette />
                <p className="ml-2 text-xl font-medium max-rg_desktop:text-sm">
                  Creation
                </p>
              </Link>
            </li>

            <li>
              <Link
                href="/plans"
                className="flex items-center justify-start"
                onClick={closeMenu}
              >
                <FaBookmark />
                <p className="ml-2 text-xl font-medium max-rg_desktop:text-sm">
                  Plans
                </p>
              </Link>
            </li>

            <li>
              <Link
                href="https://discord.gg/qVVFgB9UPy"
                className="flex items-center justify-start"
                target="_blank"
                onClick={closeMenu}
              >
                <FaTools />
                <p className="ml-2 text-xl font-medium max-rg_desktop:text-sm">
                  Support
                </p>
              </Link>
            </li>
            <li>
              <SignOutButton redirectUrl="/">
                <button className="flex items-center justify-start">
                  <FaSignOutAlt className="mr-2" />
                  <p className="max-rg_desktop:text-sm">Sign Out</p>
                </button>
              </SignOutButton>
            </li>
          </ol>
        </div>
      )}
    </header>
  );
}
