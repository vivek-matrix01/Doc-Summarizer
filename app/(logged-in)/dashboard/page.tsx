import EmptyState from "@/components/summary/emptyState";
import SummaryCard from "@/components/summary/summary-card";
import { Button } from "@/components/ui/button";
import { MotionDiv, MotionH1, MotionP } from "@/components/ui/common/motion-wrapper";

import { getSummaries } from "@/lib/summaries";
import { hasReachedUploadLimit } from "@/lib/user";
import { itemVariants } from "@/utils/constant";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  
    const user= await currentUser();
    const userId= user?.id as string;
    if(!userId){
        return redirect('/sign-in');}
      const {hasReachedLimit,uploadLimit}=await hasReachedUploadLimit(userId);
    const summary= await getSummaries({userId})
    
  return <>
  <div className="min-h-screen bg-white">
    <div className="conatiner mx-auto flex flex-col gap-4 ">
        <div className="px-12 py-12 sm:py-24">
            <div className="flex gap-4 mb-8 justify-between">
        <div className="flex flex-col gap-2"><MotionH1 variants={itemVariants}
        initial='hidden'
        whileInView='visible'

        className="text-4xl font-bold tracking-tight bg-linear-to-r from-gray-600 to-gray-900 bg-clip-text text-transparent">Your Summaries</MotionH1>
        <MotionP variants={itemVariants}
        initial='hidden'
        whileInView='visible'
         className="text-gray-600">Transform your pdf into concise,actionable insights</MotionP ></div>
        {!hasReachedLimit &&
        <MotionDiv
        variants={itemVariants}
        initial='hidden'
        animate='visible'
        whileHover={{scale:1.05}}
  
        
        className="self-start"><Button  className=' bg-linear-to-r from-rose-500 to-rose-700 hover:from-rose-800 hover:to-rose-400 text-white hover:scale-105 transition-all duration-300 ' ><Link className="flex items-center  hover:no-underline " href={'/upload'}><Plus className="w-5 h-5 mr-2"/>New Summary</Link></Button>
        </MotionDiv>}
        </div>
        {hasReachedLimit &&
        <MotionDiv
        variants={itemVariants}
        initial='hidden'
        animate='visible'
        whileHover={{scale:1.05}} className="mb-6">
            <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 text-red-800"><p className="text-sm">You have reached the limit of {uploadLimit} uploads of basic plan .{' '}<Link href={'#'} className="text-rose-800 underline font-medium underline-offset-4 inline-flex items-center"> Click here to upgrade to PRO <ArrowRight className="w-4 h-4 inline-block"/></Link> for unlimited uploads.</p></div>
        </MotionDiv>}
        {summary.length===0?<EmptyState/>:(
        <div className="grid grid-cols-1 gap-4  sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
        {summary.map((ele, index) => (
  <SummaryCard  summary={ ele} key={index} />
))}
        </div>)}
        </div>
    </div>

  </div>
  </>;
}
