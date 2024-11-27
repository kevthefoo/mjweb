export default async function Account() {
    return (
        <section className="flex flex-col text-center pt-16 px-20 w-full h-full pb-12 bg-neutral-800">
            <h1 className="text-3xl">Manage Subscription</h1>
            <h3 className="text-gray-500 mb-16">
                Change or cancel your plan anytime
            </h3>
            <div className="rounded-xl border-[1px] h-full px-8 pt-4 bg-zinc-900">
                <div className="mb-8 flex justify-between items-center">
                    <h1 className="text-3xl">Your Plan</h1>
                    <div className="flex gap-4">
                        <button className="border-[1px] rounded-full px-4 py-2 hover:bg-neutral-700">Change Plan</button>
                        <button className="border-[1px] rounded-full px-4 py-2 hover:bg-neutral-700">Cancel Plan</button>
                    </div>
                </div>

                <div className="flex gap-20 ">
                    <div className="border-[1px] text-start w-1/2 rounded-xl px-4 py-4 bg-gray-900">
                        <h1 className="mb-4 text-2xl">
                            Standard Plan Features
                        </h1>
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
                    <div className="border-[1px] text-start w-1/2 rounded-xl px-4 py-4 bg-gray-900">
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
