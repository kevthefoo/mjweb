import SignInButtonComponent from "@/components/SignInButtonComponent";

export default function LandingPage() {
  return (
    <main>
      <section className="flex min-h-screen flex-col items-center justify-center bg-[url('/inter.svg')] bg-cover bg-center bg-no-repeat px-12 text-center">
        <h1 className="mb-12">
          Unlock Your Creativity with New Era Generative AI
        </h1>
        <SignInButtonComponent />
      </section>
    </main>
  );
}
