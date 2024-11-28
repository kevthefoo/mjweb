export default async function Plans() {
  return (
    <section className="h-full w-full overflow-y-scroll bg-neutral-800 px-20 pb-12 pt-16 text-center">
      <h1 className="text-center text-3xl">Subscription Plans</h1>
      <h3 className="mb-16 text-gray-500">
        Choose the plan that works for you
      </h3>
      <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
      <stripe-pricing-table
        pricing-table-id="prctbl_1PRVGnBaMQOMc3iJAlmHno1g"
        publishable-key="pk_test_51OiLl6BaMQOMc3iJcCqhnFcMCIFrEs2Dr7BIhemWGt1NejBPFMy7qYdjmIh6lXuw0H1S1sIzDOSMncCXjRJrVwBt00cGjkEOSd"
      ></stripe-pricing-table>
    </section>
  );
}
