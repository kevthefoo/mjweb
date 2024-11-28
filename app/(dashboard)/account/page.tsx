export default async function Account() {
  return (
    <section className="flex h-full w-full flex-col bg-neutral-800 px-20 pb-12 pt-16 text-center">
      <h1 className="text-3xl">Manage Subscription</h1>
      <h3 className="mb-16 text-gray-500">
        Change or cancel your plan anytime
      </h3>
      <div className="h-full rounded-xl border-[1px] bg-zinc-900 px-8 pt-4">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl">Your Plan</h1>
          <div className="flex gap-4">
            <button className="rounded-full border-[1px] px-4 py-2 hover:bg-neutral-700">
              Change Plan
            </button>
            <button className="rounded-full border-[1px] px-4 py-2 hover:bg-neutral-700">
              Cancel Plan
            </button>
          </div>
        </div>

        <div className="flex gap-20">
          <div className="w-1/2 rounded-xl border-[1px] bg-gray-900 px-4 py-4 text-start">
            <h1 className="mb-4 text-2xl">Standard Plan Features</h1>
            <ul className="flex flex-col gap-4">
              <li>
                <p>15h Fast generations</p>
              </li>
              <li>
                <p>General commercial terms</p>
              </li>
              <li>
                <p>Optional credit top ups</p>
              </li>
              <li>
                <p>3 concurrent fast jobs</p>
              </li>
              <li>
                <p>Unlimited Relaxed generations</p>
              </li>
            </ul>
          </div>
          <div className="w-1/2 rounded-xl border-[1px] bg-gray-900 px-4 py-4 text-start">
            <h1 className="mb-4 text-2xl">Billing & Payment</h1>
            <ul className="flex flex-col gap-4">
              <li>
                <p>Price</p>
              </li>
              <li>
                <p>Billing period</p>
              </li>
              <li>
                <p>Renewal date</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
