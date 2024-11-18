import { SignInButton } from "@clerk/nextjs";

export default function Home() {
    return (
        <main>
            <section className="landing_page_section min-h-screen flex flex-col gap-4 justify-center items-center bg-center bg-no-repeat	bg-cover text-center px-12 bg-[url('/inter.svg')]">
                <h1 className="landing_page_title">
                    Unlock Your Creativity with New Era Generative AI
                </h1>
                <SignInButton mode="modal" forceRedirectUrl="/home">
                    <button className="landing_page_enter_button border-2 border-white mt-8 py-2 px-4 rounded-2xl hover:bg-indigo-800">
                        Enter
                    </button>
                </SignInButton>
            </section>
        </main>
    );
}
