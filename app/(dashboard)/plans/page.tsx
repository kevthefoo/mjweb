export default async function Plans() {
    return (
        <section className="h-full w-full pt-16 px-20 pb-12 overflow-y-scroll bg-neutral-800 text-center">
            <h1 className="text-3xl   text-center">Subscription Plans</h1>
            <h3 className="text-gray-500 mb-16">
                Choose the plan that works for you
            </h3>
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
