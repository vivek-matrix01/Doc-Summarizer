import { getPriceIdForActiveUser } from "@/lib/user";
import { pricingPlans } from "@/utils/constant";
import { currentUser } from "@clerk/nextjs/server"
import { Badge } from "../badge";
import { Crown } from "lucide-react";

export default  async function PlanBadge(){
const user=await currentUser();
if(!user?.id) {return null;}
const email=user?.emailAddresses?.[0]?.emailAddress;
let priceId:string|null=null;
if(email){
   priceId =await getPriceIdForActiveUser(email);
}
let planName='Buy a Plan';
const plan=pricingPlans.find((plan)=>plan.priceId===priceId);
if(plan){
    planName=plan.name;

}
return <>
<Badge style={{'width':'85px','backgroundColor':'#E21328','pointerEvents':'none'}}><Crown/>{planName}</Badge>
</>
}