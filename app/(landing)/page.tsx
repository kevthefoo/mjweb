import SignInButtonComponent from "@/components/SignInButtonComponent";

export default function LandingPage() {
    return (
        <main>
            <section className="landing_page_section min-h-screen flex flex-col gap-4 justify-center items-center bg-center bg-no-repeat	bg-cover text-center px-12 bg-[url('/inter.svg')]">
                <h1 className="landing_page_title">
                    Unlock Your Creativity with New Era Generative AI
                </h1>
                <SignInButtonComponent />
            </section>
        </main>
    );
}
