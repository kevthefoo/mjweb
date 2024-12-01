import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
    console.log("Received webhook request...");

    const body = await req.text();
    const sig = req.headers.get("stripe-signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (error) {
        console.error("Error processing webhook:", error);
        return NextResponse.json(
            { error: `Webhook Error` },
            { status: 400 }
        );
    }

    // Do something with the event
    if (event.type === "checkout.session.completed") {
        const subscription = event.data.object;
        console.log("New subscription created:", subscription.id);
        console.log("Customer:", subscription.customer);
        console.log("Plan:", subscription.plan?.nickname);
        console.log(subscription.client_reference_id);
    }

    return NextResponse.json({ received: true });
}

export const config = {
    api: {
        bodyParser: false,
    },
};
