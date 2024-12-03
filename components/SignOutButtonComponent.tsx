"use client";

// import { redirect } from "next/navigation";

import { FaSignOutAlt } from "react-icons/fa";
import { SignOutButton } from "@clerk/nextjs";

export default function SignOutButtonComponent() {
  // const { user } = useUser();
  // if (!user) {
  //     redirect("/");
  // }

  return (
    <SignOutButton redirectUrl="/">
      <button
        className="flex items-center rounded-2xl border-2 border-white px-4 py-2 hover:bg-neutral-700"
        onClick={() => console.log("sign out")}
      >
        <FaSignOutAlt className="mr-2" />
        <p>Sign Out</p>
      </button>
    </SignOutButton>
  );
}
