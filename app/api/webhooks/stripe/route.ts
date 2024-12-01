import { NextResponse } from "next/server";
import Stripe from "stripe";

import { createClerkClient } from "@clerk/backend";

const clerkClient = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY,
});

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
const discordWebhookUrl =
    "https://discord.com/api/webhooks/1312784375292624906/NmR1m_9zKgg6isuQ7bUqyyHm2n3_R0qb8XOk5z25fnyAmCAXRb5GKWgzn0P0pxFCjcGB";

async function sendDiscordMessage(message: string) {
    try {
        const response = await fetch(discordWebhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ content: message }),
        });

        if (!response.ok) {
            throw new Error(
                `Discord API responded with status ${response.status}`
            );
        }

        console.log("Message sent to Discord successfully");
    } catch (error) {
        console.error("Error sending message to Discord:", error);
    }
}

async function getSubscriptionDetails(subscriptionId: string) {
    try {
        const subscription = await stripe.subscriptions.retrieve(
            subscriptionId
        );
        const productID = subscription.plan.product as string;
        const product = await stripe.products.retrieve(productID);

        const plan = subscription.items.data[0].plan;
        return {
            planName: product.name || "Unknown Plan",
            planAmount: plan.amount
                ? `${(plan.amount / 100).toFixed(
                      2
                  )} ${plan.currency.toUpperCase()}`
                : "N/A",
            interval: plan.interval || "N/A",
            intervalCount: plan.interval_count || 1,
        };
    } catch (error) {
        console.error("Error fetching subscription details:", error);
        return null;
    }
}

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
        const subscriptionId = subscription.subscription as string;
        const stripeCustomerId = subscription.customer;
        const clerkUserId = subscription.client_reference_id;
        
        if (clerkUserId && stripeCustomerId) {
            try {
                const user = await clerkClient.users.getUser(clerkUserId);
                // Fetch subscription details
                const subscriptionDetails = await getSubscriptionDetails(
                    subscriptionId
                );

                if (!subscriptionDetails) {
                    throw new Error("Failed to fetch subscription details");
                }

                await clerkClient.users.updateUser(clerkUserId, {
                    publicMetadata: {
                        stripeCustomerId: stripeCustomerId,
                        stripePlanName: subscriptionDetails.planName,
                        stripePlanAmount: subscriptionDetails.planAmount,
                        stripePlanInterval: `${subscriptionDetails.intervalCount} ${subscriptionDetails.interval}`,
                    },
                });

                console.log(
                    `Updated Clerk user ${clerkUserId} with Stripe customer ID ${stripeCustomerId}`
                );
                const discordMessage = `**New Subscription!**\n**User: **${user.username}\n**Plan: **${subscriptionDetails.planName}\n**Amount: **${subscriptionDetails.planAmount}\n**Billing Cycle: **${subscriptionDetails.intervalCount} ${subscriptionDetails.interval}\n--------------------`;

                sendDiscordMessage(discordMessage);
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
