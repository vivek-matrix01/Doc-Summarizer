"use client";
import { ArrowRight} from "lucide-react";


import Link from "next/link";
import {  MotionSpan } from "../common/motion-wrapper";

import { toast } from "sonner";
const buttonVariants={
  scale:1.05,
  transition:{
    type:'spring',
    stiffness:300,
    damping:10,
  }
}

  

  
export default function PricingLink({UserId}:{UserId:string}) {
    const userId= (UserId!=='NOUSER')?UserId:undefined;
    
    return <>
     {
                      
                      userId ? ( <Link href={"/upload"} className="flex gap-2 items-center">
                      <MotionSpan whileHover={buttonVariants}> Try DocSummarizer</MotionSpan>
                      <ArrowRight className="animate-pulse" />
                    </Link>) :(<a href={'#pricing'} className="flex gap-2 items-center" onClick={()=>{toast.info("Please Buy a Plan to enjoy the features")}}>
                      <MotionSpan whileHover={buttonVariants}> Try DocSummarizer</MotionSpan>
                      <ArrowRight className="animate-pulse" />
                    </a>)
                   }
    </>
}
export  function CtaLink({UserId}:{UserId:string}) {
    const userId= (UserId!=='NOUSER')?UserId:undefined;
    
    return <>
     {
                      
                      userId ? (<Link
                        href="/upload"
                        className="flex items-center justify-center px-6 py-6"
                      >
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4 animate-pulse" />
                      </Link>) :(<a
                        href="#pricing"
                        className="flex items-center justify-center px-6 py-6"
                        onClick={() => {
                          toast.info("Please Buy a Plan to enjoy the features");
                        } }
                      >
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4 animate-pulse" />
                      </a>)
                   }
    </>
}
