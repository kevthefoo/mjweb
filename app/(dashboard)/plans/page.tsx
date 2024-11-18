export default async function Plans() {
    return (
        <section className="h-full w-full border-4 border-white py-4">
            <script
                async
                src="https://js.stripe.com/v3/pricing-table.js"
            ></script>
        </section>
    );
}
