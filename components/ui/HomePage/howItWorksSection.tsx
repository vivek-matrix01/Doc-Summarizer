import { BrainCircuit, FileOutput, FileText, MoveRight } from "lucide-react";
import { MotionDiv, MotionH2, MotionH3 } from "../common/motion-wrapper";

type Steps = {
  icon: React.ReactNode;
  label: string;
  description: string;
};
const steps: Steps[] = [
  {
    icon: <FileText size={64} strokeWidth={1.5} />,
    label: "Upload your PDF",
    description:
      "Simply drag abd drop your PDF file into the upload area or click to select a file from your device.",
  },
  {
    icon: <BrainCircuit size={64} strokeWidth={1.5} />,
    label: "AI Analysis",
    description:
      "Our advanced AI technology will analyze the document and extract key information, providing you with a clear and concise summary.",
  },
  {
    icon: <FileOutput size={64} strokeWidth={1.5} />,
    label: "Get summary",
    description:
      "Receive a beautifully formatted summary reel of the document, highlighting the most important points and insights.",
  },
];

export default function HowItWorksSection() {
  return (
    <>
      <section className="relative overflow-hidden bg-gray-50">
        <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
          <div className="text-center mb-16">
            <MotionH2 initial={{opacity:0,y:20}}
            whileInView={{opacity:1,y:0}}
            transition={{duration:0.5}}
            className="uppercase mb-4 font-bold text-xl text-rose-500">
              How It Works
            </MotionH2 >
            <MotionH3 initial={{opacity:0,y:20}}
            whileInView={{opacity:1,y:0}}
            transition={{duration:0.5,delay:0.2}}
            className="font-bold max-w-2xl mx-auto text-3xl">
              Transform any pdf into an easy-to-digest summary in three simple
              steps
            </MotionH3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl relative mx-auto">
            {steps.map((step, index) => (
              <MotionDiv
              initial={{opacity:0,y:20}}
            whileInView={{opacity:1,y:0}}
            transition={{duration:0.5,delay:index*0}}
              className="relative items-stretch flex gap-4 " key={index}>
                <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg  duration-300 transition-transform ease-linear hover:scale-105 group">
                  <div className="mb-4 text-red-500 bg-linear-to-br from-rose-500/10 to-transparent group-hover:from-rose-500/20 transition-colors  p-2 rounded-2xl">
                    {step.icon}
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{step.label}</h4>
                  <p className="text-gray-600 text-center">
                    {step.description}
                  </p>
                </div>
                {steps.length - 1 > index && (
                  <MotionDiv 
                  initial={{opacity:0}}
            whileInView={{opacity:1}}
            transition={{duration:0.5,delay:index*0.2+0.3}}
                  className="hidden md:flex md:items-center md:justify-center">
                    <MoveRight
                      size={32}
                      strokeWidth={1}
                      className="text-rose-400"
                    />
                  </MotionDiv>
                )}
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
