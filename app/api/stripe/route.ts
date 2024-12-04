import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(request: NextRequest) {
  const stripeCustomerId = request.headers.get("stripecustomerid");
  console.log("Stripe Customer ID:", stripeCustomerId);
  if (!stripeCustomerId) {
    return NextResponse.json(
      { error: "Stripe Customer ID is required" },
      { status: 400 },
    );
  }

  if (stripeCustomerId == "undefined") {
    return NextResponse.json({
      planName: "Free Plan",
      price: 0,
      currency: "USD",
      interval: "N/A",
      renewalDate: "N/A",
      features: [
        { name: "Feature 1" },
        { name: "Feature 2" },
        { name: "Feature 3" },
      ],
    });
  }

  try {
    const subscription = await stripe.subscriptions.list({
      customer: stripeCustomerId,
      limit: 1,
    });

    const plan = subscription.data[0].plan;
    const productID = plan.product as string;
    const product = await stripe.products.retrieve(productID);

    return NextResponse.json({
      planName: product.name || "Unknown Plan",
      price: plan.amount ? plan.amount / 100 : 0, // Convert cents to dollars
      currency: plan.currency,
      interval: plan.interval,
      renewalDate: new Date(
        subscription.current_period_end * 1000,
      ).toLocaleDateString(),
      features: product.marketing_features,
    });
  } catch (error) {
    console.error("Error fetching subscription:", error);
    return null;
  }
}
