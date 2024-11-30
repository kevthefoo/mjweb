import StripePricingTable from '@/components/PricingTable'

export default function Plans() {
  return (
    <section className="h-full w-full overflow-y-scroll bg-neutral-800 px-20 pb-12 pt-16 text-center">
      <h1 className="text-center text-3xl">Subscription Plans</h1>
      <h3 className="mb-16 text-gray-500">
        Choose the plan that works for you
      </h3>
      <StripePricingTable
        pricingTableId="prctbl_1PRVGnBaMQOMc3iJAlmHno1g"
        publishableKey="pk_test_51OiLl6BaMQOMc3iJcCqhnFcMCIFrEs2Dr7BIhemWGt1NejBPFMy7qYdjmIh6lXuw0H1S1sIzDOSMncCXjRJrVwBt00cGjkEOSd"
      />
    </section>
  )
}

