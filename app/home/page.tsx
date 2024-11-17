import "./page.css";

export default async function Home({ params }: { params: { lang: string } }) {
    return (
        <main>
            <section className="landing_page_section">
                <h1 className="landing_page_title">
                    Unlock Your Creativity with New Era Generative AI
                </h1>
                <a
                    href={`/${params.lang}/home`}
                    className="landing_page_enter_button"
                >
                    Enter
                </a>
            </section>
        </main>
    );
}
