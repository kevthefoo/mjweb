"use client";

import StripePricingTable from "@/components/PricingTable";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Plans() {
  const { user, isLoaded } = useUser();
  const [userID, setUserID] = useState<string>("");

  useEffect(() => {
    if (isLoaded) {
      if (!user) {
        redirect("/");
      } else {
        setUserID(user.id);
      }
    }
  }, [user, isLoaded]);

  return (
    <section className="h-full w-full overflow-y-scroll bg-neutral-800 px-20 pb-12 pt-16 text-center max-sm_tablet:px-10">
      <h1 className="text-center text-3xl">Subscription Plans</h1>
      <h3 className="mb-16 text-gray-500">
        Choose the plan that works for you
      </h3>
      <StripePricingTable
        pricingTableId="prctbl_1PRVGnBaMQOMc3iJAlmHno1g"
        publishableKey="pk_test_51OiLl6BaMQOMc3iJcCqhnFcMCIFrEs2Dr7BIhemWGt1NejBPFMy7qYdjmIh6lXuw0H1S1sIzDOSMncCXjRJrVwBt00cGjkEOSd"
        clerkUserID={userID}
      />
    </section>
  );
}
