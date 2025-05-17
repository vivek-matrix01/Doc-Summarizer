import { handleCheckoutSessionCompleted, handleSubscriptionDeleted } from "@/lib/payments";
import { NextRequest,NextResponse } from "next/server";
import Stripe from 'stripe'
const stripe=new Stripe(process.env.STRIPE_SECRET_KEY!);

export const POST=async (req:NextRequest)=>{
    const payload =await req.text();
    const sig=req.headers.get('stripe-signature');
    let event;
    const endpointSecret=process.env.STRIPE_WEBHOOK_SECRET!;
    try{
        event=stripe.webhooks.constructEvent(payload,sig!,endpointSecret)
        switch(event.type){


            case 'checkout.session.completed': 
            const sessioniD=event.data.object.id;
            console.log('checkout session completed')
                const session= await  stripe.checkout.sessions.retrieve(sessioniD,{
               expand :['line_items'],
})
await handleCheckoutSessionCompleted({session,stripe})                                         
break;


            case 'customer.subscription.deleted': 
            console.log('coustomer subscripton deleted')
            const subscription=event.data.object;
            const subscriptionId=event.data.object.id;
            await handleSubscriptionDeleted({subscriptionId,stripe})
            console.log(subscription);
            break;

            default: console.log('Unhandled Event Type',event.type);
        }
    }
    
    catch(err){
        console.log(err);
        return NextResponse.json({error:'Failed To Trigger Webhook',err},{status:400})
    }
    return NextResponse.json({
        status:'success',
        
    });
}