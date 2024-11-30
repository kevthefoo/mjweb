import Stripe from 'stripe'
import { NextResponse } from "next/server";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)


export async function GET(userEmailAddress: string) {
  console.log(userEmailAddress)
  try {
    // Fetch the customer ID associated with the user
    const customer = await stripe.customers.list({
      email: userEmailAddress, // Assuming userId is the user's email
      limit: 1,
    })

    if (customer.data.length === 0) {
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 520 },)
    }

    // Fetch the subscription for the customer
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.data[0].id,
      status: 'active',
      expand: ['data.plan.product'],
    })

    if (subscriptions.data.length === 0) {
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 520 },) // No active subscription found
    }
    
    const subscription = subscriptions.data[0]
    const plan = subscription.plan as Stripe.Plan & { product: Stripe.Product }

    return NextResponse.json({
      planName: plan.product.name,
      price: plan.amount ? plan.amount / 100 : 0, // Convert cents to dollars
      currency: plan.currency,
      interval: plan.interval,
      renewalDate: new Date(subscription.current_period_end * 1000).toLocaleDateString(),
    })
  } catch (error) {
    console.error('Error fetching subscription:', error)
    return null
  }
}
