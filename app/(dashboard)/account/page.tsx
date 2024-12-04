"use client";
import { redirect } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";

type PlanName = "Pro Plan" | "Standard Plan" | "Basic Plan" | "Free Plan";

type Feature = {
  name: string;
};

type Data = {
  planName: PlanName;
  price: number;
  currency: string;
  interval: string;
  renewalDate: string;
  features: Feature[];
};

export default function Account() {
  const [userSubData, setData] = useState<Data | null>(null);

  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(true);

  const stripeCustomerId = user?.publicMetadata?.stripeCustomerId as string;

  // Get the user's subscription data
  const getSubData = async (stripeCustomerId: string) => {
    try {
      const response = await fetch("/api/stripe/", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          stripeCustomerId: stripeCustomerId,
        },
      });
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error subscribing:", error);
    }
  };

  useEffect(() => {
    if (isLoaded) {
      if (!user || !user.primaryEmailAddress) {
        redirect("/");
      } else {
        setLoading(false);
        getSubData(stripeCustomerId);
      }
    }
  }, [user, isLoaded, stripeCustomerId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="flex h-full w-full flex-col overflow-y-scroll bg-neutral-800 px-20 pb-12 pt-16 text-center max-sm_tablet:px-10 max-lg_mobile:pb-20">
      <h1 className="text-3xl max-lg_mobile:text-xl">Manage Subscription</h1>
      <h3 className="mb-16 text-gray-500">
        Change or cancel your plan anytime
      </h3>
      <div className="h-full w-full rounded-xl border-[1px] bg-zinc-900 px-8 pt-4 max-lg_tablet:min-h-screen max-sm_tablet:px-4">
        <div className="mb-8 flex items-center justify-between max-lg_tablet:flex-col max-lg_tablet:gap-4">
          <h1 className="text-3xl max-lg_tablet:text-2xl max-lg_mobile:text-xl">
            Your Plan
          </h1>
          <div className="flex gap-4">
            <button className="rounded-full border-[1px] px-4 py-2 hover:bg-neutral-700 max-lg_tablet:text-sm max-sm_tablet:px-2 max-sm_tablet:py-1 max-sm_tablet:text-xs">
              Change Plan
            </button>
            <button className="rounded-full border-[1px] px-4 py-2 hover:bg-neutral-700 max-lg_tablet:text-sm max-sm_tablet:px-2 max-sm_tablet:py-1 max-sm_tablet:text-xs">
              Cancel Plan
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-20 max-lg_tablet:flex-col">
          <div className="w-1/2 rounded-xl border-[1px] bg-gray-900 px-4 py-4 text-start max-lg_tablet:w-full">
            <h1 className="mb-4 text-2xl max-lg_tablet:text-xl max-sm_tablet:text-lg max-lg_mobile:text-base">
              {userSubData?.planName}
            </h1>
            <ul className="flex flex-col gap-4 max-lg_tablet:text-base max-sm_tablet:text-xs">
              {userSubData?.features.map((item, keys) => {
                return (
                  <li key={keys}>
                    <p>{item.name}</p>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="w-1/2 rounded-xl border-[1px] bg-gray-900 px-4 py-4 text-start max-lg_tablet:w-full">
            <h1 className="mb-4 text-2xl max-lg_tablet:text-xl max-sm_tablet:text-lg max-lg_mobile:text-base">
              Billing & Payment
            </h1>
            <ul className="flex flex-col gap-4 max-lg_tablet:text-base max-sm_tablet:text-xs">
              <li>
                <p>Price: {userSubData?.price}</p>
              </li>
              <li>
                <p>Billing period: {userSubData?.interval}</p>
              </li>
              <li>
                <p>Renewal date: {userSubData?.renewalDate}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
