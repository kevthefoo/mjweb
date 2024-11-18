"use client";

import { SignInButton } from "@clerk/nextjs";

export default function SignInButtonComponent() {
    return (
        <SignInButton mode="modal" forceRedirectUrl="/home">
            <button
                autoFocus
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        e.currentTarget.click();
                    }
                }}
                className="landing_page_enter_button border-2 border-white mt-8 py-2 px-4 rounded-2xl hover:bg-indigo-800"
            >
                Enter
            </button>
        </SignInButton>
    );
}
