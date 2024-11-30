import SignInButtonComponent from "@/components/SignInButtonComponent";

export default function LandingPage() {
    return (
        <main>
            <section className="landing_page_section flex min-h-screen flex-col items-center justify-center gap-4 bg-[url('/inter.svg')] bg-cover bg-center bg-no-repeat px-12 text-center">
                <h1 className="landing_page_title">
                    Unlock Your Creativity with New Era Generative AI
                </h1>
                <SignInButtonComponent />
            </section>
        </main>
    );
}
