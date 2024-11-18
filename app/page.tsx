export default async function Home() {
    return (
        <main>
            <section className="min-h-screen flex flex-col gap-4 justify-center items-center bg-center bg-no-repeat	bg-cover text-center px-12 bg-[url('/inter.svg')]">
                <h1 className="landing_page_title">
                    Unlock Your Creativity with New Era Generative AI
                </h1>
                <a href="/home" className="landing_page_enter_button">
                    Enter
                </a>
            </section>
        </main>
    );
}
