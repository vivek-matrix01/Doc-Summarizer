
import {  Sparkles } from "lucide-react";
import { AuroraBackground } from "../ui/aurora-background";

import { Badge } from "../badge";
import { Button } from "../button";
import { MotionDiv, MotionH1, MotionH2, MotionSection} from "../common/motion-wrapper";
import { containerVariants, itemVariants } from "@/utils/constant";
import { currentUser } from "@clerk/nextjs/server";

import PricingLink from "../common/PricingLink";
const buttonVariants={
  scale:1.05,
  transition:{
    type:'spring',
    stiffness:300,
    damping:10,
  }
}
export default async function HeroSection() {
 const user =await currentUser();
  
  return (
    <>
      <AuroraBackground>
        <section>
          <div>
            <MotionSection variants={containerVariants}
            initial='hidden'
            animate='visible'
            className="mx-auto flex flex-col items-center justify-center h-screen text-center px-4 ">
              <MotionDiv
                className=" relative p-[1px]  overflow-hidden rounded-full 
           bg-linear-to-r from-[#FF0080] to-[#FF8C00] text-white mr-2 animate-gradient-x  w-47"
              >
                <Badge
                  className="relative px-6 py-2 text-base font-medium bg-white   rounded-full group-hover:bg-gray-50 transition-colors duration-200
              hover:bg-secondary/90 "
                >
                  <Sparkles className="h-6 w-6 mr-2 text-rose-600 animate-pulse" />
                  <p className="text-base text-rose-600">Powered by AI</p>
                </Badge>
              </MotionDiv>
              <div className="">
                <MotionH1 variants={itemVariants} className="font-bold py-6 text-center text-4xl">
                  Transform PDF's into
                  <span className="ml-1.5 bg-yellow-200/80">concise</span>{" "}
                  Summaries
                </MotionH1>
                <MotionH2  variants={itemVariants}className="text-lg sm:text-xl lg:text-2xl text-center px-4 lg:px-0 lg:max-w-4xl text-gray-600">
                  Get a beautiful summary reel of the document in seconds.
                </MotionH2>
                <MotionDiv variants={itemVariants} whileHover={buttonVariants} className="m-5">
                  <Button
                    variant={"link"}
                    className="after:pointer-events-auto
                 bg-linear-to-r from-slate-900 to-rose-500 hover:from-rose-500 hover:to-slate-900 hover:text-white
                 hover:scale-105
                  text-white transition-all ease-in duration-300
                  font-bold 
              text-base sm:text-lg lg:text-xl rounded-full px-8 sm:px-10 lg:px-12 py-6 sm:py-7 lg:py-8 lg:mt-16 "
                  >
                   <PricingLink UserId={user?.id||'NOUSER'} />
                  </Button>
                </MotionDiv>
              </div>
            </MotionSection >
          </div>
        </section>
      </AuroraBackground>
    </>
  );
}
