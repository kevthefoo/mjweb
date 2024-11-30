"use client"
import { redirect } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import planData from "@/data/planData.json"

type PlanName = "Pro Plan" | "Standard Plan" | "Basic Plan";

type Data = {
  planName: PlanName,
  price: number,
  currency: string,
  interval: string,
  renewalDate: string
}

type Email = string

export default function Account() {
  const [userSubData, setData] = useState<Data | null>(null)

  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(true);





  // Get the user's subscription data
  

  const getSubData = async (userEmailAddress: Email) => {
    try {
      const response = await fetch(`/api/stripe/${encodeURIComponent(userEmailAddress)}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'User-Email': userEmailAddress,
        },

      })
      const data = await response.json()
      setData(data)
    } catch (error) {
      console.error('Error subscribing:', error)
    }

  }

  useEffect(() => {
    if (isLoaded) {
      if (!user || !user.primaryEmailAddress) {
        redirect('/');
      } else {
        setLoading(false);
        getSubData(user.primaryEmailAddress.emailAddress)
      }
    }
  }, [user, isLoaded]);

  
  if (loading) {
    return <div>Loading...</div>;
  }

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
            <h1 className="mb-4 text-2xl">{userSubData?.planName}</h1>
            <ul className="flex flex-col gap-4">
              {userSubData?.planName && planData[userSubData.planName]?.features.map((item, keys) => {
                return (
                  <li key={keys}>
                    <p>{item}</p>
                  </li>
                );
              })}

            </ul>
          </div>
          <div className="w-1/2 rounded-xl border-[1px] bg-gray-900 px-4 py-4 text-start">
            <h1 className="mb-4 text-2xl">Billing & Payment</h1>
            <ul className="flex flex-col gap-4">
              <li>
                <p>{userSubData?.price}</p>
              </li>
              <li>
                <p>{userSubData?.interval}</p>
              </li>
              <li>
                <p>Renewal date {userSubData?.renewalDate}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
