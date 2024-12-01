"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

interface StripePricingTableProps {
    pricingTableId: string;
    publishableKey: string;
    clerkUserID: string;
}

export default function StripePricingTable({
    pricingTableId,
    publishableKey,
    clerkUserID,
}: StripePricingTableProps) {
    const pricingTableRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (pricingTableRef.current) {
            const stripePricingTable = document.createElement(
                "stripe-pricing-table"
            );
            stripePricingTable.setAttribute("pricing-table-id", pricingTableId);
            stripePricingTable.setAttribute("publishable-key", publishableKey);
            stripePricingTable.setAttribute("client-reference-id", clerkUserID);
            pricingTableRef.current.appendChild(stripePricingTable);
        }

        return () => {
            if (pricingTableRef.current) {
                pricingTableRef.current.innerHTML = "";
            }
        };
    }, [pricingTableId, publishableKey, clerkUserID]);

    return (
        <>
            <Script
                src="https://js.stripe.com/v3/pricing-table.js"
                strategy="lazyOnload"
            />
            <div ref={pricingTableRef} className="" />
        </>
    );
}
