export default async function Plans() {
    return (
        <section className="h-full w-full pt-16 px-20 pb-12 overflow-y-scroll">
            <h1 className="text-3xl mb-8 text-center">Plans</h1>
            <script
                async
                src="https://js.stripe.com/v3/pricing-table.js"
            ></script>
            <stripe-pricing-table
                pricing-table-id="prctbl_1PRVGnBaMQOMc3iJAlmHno1g"
                publishable-key="pk_test_51OiLl6BaMQOMc3iJcCqhnFcMCIFrEs2Dr7BIhemWGt1NejBPFMy7qYdjmIh6lXuw0H1S1sIzDOSMncCXjRJrVwBt00cGjkEOSd"
            ></stripe-pricing-table>
        </section>
    );
}
