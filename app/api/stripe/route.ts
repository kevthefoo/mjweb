import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(request: NextRequest) {
  // Get the Stripe Customer ID from the request headers
  const stripeCustomerId = request.headers.get("stripecustomerid");
  console.log(`\nStripe Customer ID: ${stripeCustomerId}\n`);

  // Check if the Stripe Customer ID is missing
  if (!stripeCustomerId) {
    return NextResponse.json(
      { error: "Stripe Customer ID is required" },
      { status: 400 },
    );
  }

  // Check if the Stripe Customer ID is "undefined"      ???What if a user once subscribed but subscription has expired???
  if (stripeCustomerId == "undefined") {
    return NextResponse.json({
      planName: "Free Plan",
      price: 0,
      currency: "USD",
      interval: "N/A",
      startDay: "N/A",
      endDay: "N/A",
      features: [
        { name: "Full access to our gallery" },
        { name: "3 Image Vision jobs" },
      ],
    });
  }

  // Fetch the subscription data from Stripe         ??What if a user has multiple subscription records???
  try {
    const subscriptionData = await stripe.subscriptions.list({
      customer: stripeCustomerId,
      limit: 1,
    });

    const subscription = subscriptionData.data[0].items.data[0];
    if (!subscription) {
      throw new Error("No subscription found");
    }

    const plan = subscription.plan;
    const productID = plan.product as string;
    const product = await stripe.products.retrieve(productID);

    // Return the subscription data
    return NextResponse.json({
      planName: product.name || "Unknown Plan",
      price: plan.amount ? plan.amount / 100 : 0,
      currency: plan.currency,
      interval: plan.interval,
      startDay: new Date(
        subscriptionData.data[0].current_period_start * 1000,
      ).toLocaleDateString(),
      endDay: new Date(
        subscriptionData.data[0].current_period_end * 1000,
      ).toLocaleDateString(),
      features: product.marketing_features,
    });
  } catch (error) {
    console.error("Error fetching subscription (Error Code: 3698):", error);
    return null;
  }
}
