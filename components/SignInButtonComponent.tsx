"use client";

import Link from "next/link";
import { SignInButton, useUser } from "@clerk/nextjs";

export default function SignInButtonComponent() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex cursor-not-allowed items-center justify-center rounded-2xl border-2 border-white bg-gray-800 px-4 py-2">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <SignInButton mode="modal" forceRedirectUrl="/explore">
        <button
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              e.currentTarget.click();
            }
          }}
          className="flex items-center justify-center rounded-2xl border-2 border-white px-4 py-2 hover:bg-indigo-800"
        >
          Enter
        </button>
      </SignInButton>
    );
  } else {
    return (
      <Link
        href="/explore"
        className="flex items-center justify-center rounded-2xl border-2 border-white px-4 py-2 hover:bg-indigo-800"
      >
        Enter
      </Link>
    );
  }
}
