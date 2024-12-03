"use client";

import Link from "next/link";
import { SignInButton, useUser } from "@clerk/nextjs";

export default function SignInButtonComponent() {
  const { user } = useUser();

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
          className="landing_page_enter_button mt-8 rounded-2xl border-2 border-white px-4 py-2 hover:bg-indigo-800"
        >
          Enter
        </button>
      </SignInButton>
    );
  } else {
    return (
      <Link
        href="/explore"
        className="landing_page_enter_button mt-8 rounded-2xl border-2 border-white px-4 py-2 hover:bg-indigo-800"
      >
        Enter
      </Link>
    );
  }
}
