import { Sparkles } from "lucide-react";
import { Badge } from "../ui/badge";
import { MotionDiv } from "../ui/common/motion-wrapper";
import { itemVariants } from "@/utils/constant";

export default function UploadHeader() {
  return (
    <>
      <div className=" flex flex-col items-center justify-center gap-6 text-center">
        <MotionDiv variants={itemVariants}
          className=" relative p-[1px]  overflow-hidden rounded-full 
           bg-linear-to-r from-[#FF0080] to-[#FF8C00] text-white mr-2 animate-gradient-x  w-47 mb-4"
        >
          <Badge
            variant={"secondary"}
            className="relative px-6 py-2 text-base font-medium bg-white   rounded-full group-hover:bg-gray-50 transition-colors duration-200
              hover:bg-secondary/90 "
          >
            <Sparkles className="h-6 w-6 mr-2 text-rose-600 animate-pulse" />
            <p className="text-base text-rose-600">Powered by AI</p>
          </Badge>
        </MotionDiv>
        <MotionDiv variants={itemVariants} className="capitalize text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          <h1>Start Uploading Your Pdf</h1>
        </MotionDiv>
        <MotionDiv variants={itemVariants} className="mt-2 text-lg leading-8 text-gray-600 max-w-2xl text-center">
          <p>Upload your pdf and let our AI do the magic</p>
          <hr />
      </MotionDiv>
        </div>
    </>
  );
}
