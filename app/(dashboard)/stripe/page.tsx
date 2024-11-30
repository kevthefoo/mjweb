"use client";
import { useState } from "react";


type Data={
    planName: string,
    price: number,
    currency: string,
    interval: string,
    renewalDate: string
}

export default function Page() {
    const [data, setData] =  useState<Data | null>(null)
    const subscribe = async() => {

        try {
            const response = await fetch('/api/stripe', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                },
         
                })
                const data = await response.json()    
                setData(data)
            }catch (error) {
                console.error('Error subscribing:', error)
            }
        
        }

return (
        <div onClick={subscribe}><button>Subscribe</button>
        <div>{data?.planName}</div>
        <div>{data?.price}</div>
        <div>{data?.currency}</div>
        <div>{data?.interval}</div>
        <div>{data?.renewalDate}</div>
        </div>
        
    );
}