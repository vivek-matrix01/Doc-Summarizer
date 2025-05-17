'use client'
import Lottie from "lottie-react";
import animationData from "./cloud.json";
export default function EmptyState() {
   
    return <>


  <div className="w-100 flex mx-auto flex-col items-center justify-center">
<div className="">
  <Lottie animationData={animationData} loop={true}  />
  </div>
  <div className="text-xl text-gray-600 font-semibold">NO SUMMARIES YET</div>

  </div>

    </>
}