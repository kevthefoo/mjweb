import { NextResponse } from "next/server";
import Stripe from "stripe";


import { createClerkClient } from "@clerk/backend";

const clerkClient = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY,
});

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
        return NextResponse.json({ error: `Webhook Error` }, { status: 400 });
    }

    // Do something with the event
    if (event.type === "checkout.session.completed") {
        const subscription = event.data.object;
        console.log("New subscription created:", subscription.id);
        console.log("Customer:", subscription.customer);
    
        const stripeCustomerId = subscription.customer;
        const clerkUserId = subscription.client_reference_id;
        if (clerkUserId && stripeCustomerId) {
            try {
                await clerkClient.users.updateUserMetadata(clerkUserId, {
                    publicMetadata: {
                        stripeCustomerId: stripeCustomerId,
                    },
                });
                console.log(
                    `Updated Clerk user ${clerkUserId} with Stripe customer ID ${stripeCustomerId}`
                );
            } catch (error) {
                console.error("Error updating Clerk user:", error);
                return NextResponse.json(
                    { error: "Error updating user" },
                    { status: 500 }
                );
            }
        }
    }

    return NextResponse.json({ received: true });
}

export const config = {
    api: {
        bodyParser: false,
    },
};
