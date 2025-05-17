import { Brain } from "lucide-react";
import { MotionH3 } from "../common/motion-wrapper";

export default function DemoSection() {
  return (
    <>
      <section>
     
        <div className="text-center items-center flex flex-col space-y-4">
          <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-gray-100/80 backdrop-blur-xs border border-gray-500/20 mb-4 mt-4" >
            <Brain className="w-6 h-6 text-rose-500 animate-bounce " />
          </div>
          <div className="text-center mb-16">
            {" "}
            <MotionH3 initial={{y:20,opacity:0}}
             whileInView={{y:20,opacity:1}}
             transition={{duration:0.6,delay:0.4}}
            className="font-bold text-3xl max-w-2xl mx-auto px-4 sm:px-6 ">
              Watch how this{" "}
              <span className="bg-linear-to-r from-rose-500 to-rose-900 bg-clip-text text-transparent">
                ai powered project
              </span>{" "}
              will transform any PDF into an easy-to-read summary!
            </MotionH3>
          </div>
          <div className="flex justify-center items-center px-2 sm:px-4 lg:px-6">
            {/* summary viewer */}
          </div>
        </div>
      </section>
    </>
  );
}

