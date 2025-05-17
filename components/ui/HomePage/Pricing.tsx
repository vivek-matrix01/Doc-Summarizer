import { cn } from "@/lib/utils";
import { containerVariants, itemVariants, pricingPlans } from "@/utils/constant";
import { ArrowRight, CheckIcon } from "lucide-react";
import Link from "next/link";
import { MotionDiv, MotionSection } from "../common/motion-wrapper";
type PriceType = {
  id: string;
  name: string;
  price: number;
  description: string;
  items: string[];
  paymentLink: string;
  priceId: string;
};

const listvariant={
  hidden:{
    opacity:0,x:-20
  },
  visible:{opacity:1,x:0,
    transition:{
    type:'spring',
    damping:20,
    stiffness:100,
  }}
}
const PricingCard = ({
  name,
  description,
  price,
  items,
  id,
  paymentLink,
}: PriceType) => {
  return (
    <>
      <MotionDiv variants={listvariant} 
      whileHover={{scale:1.02}}
      className="relative w-full max-w-lg hover:scale-105 hover:transition-all duration-300">
        <div 
          className={cn(
            "relative flex flex-col h-full gap-4 lg:gap-8 p-8  border-[1px] rounded-2xl border-gray-800/70 ",
            id === "pro" && "border-rose-500 gap-5 border-2"
          )}
        >
          <div className="flex justify-between items-center gap-4 "></div>
          <div>
            <p className="text-lg lg:text-xl font-bold capitalize">{name}</p>
            <p className="text-base  mt-2">{description}</p>
          </div>
          <div className="flex gap-2">
            <p className="text-5xl tracking-tight font-extrabold">${price}</p>
            <div className="text-xs flex flex-col justify-end mb-[4px] ">
              <p className=" uppercase font-semibold">USD</p>
              <p>/year</p>
            </div>
          </div>
          <div className=" space-y-2.5 leading-relaxed text-base flex-1">
            {items.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <CheckIcon size={18} />
                {item}
              </li>
            ))}
          </div>
          <div className=" space-y-2 flex justify-center w-full">
            <Link
              href={paymentLink}
              className={cn(
                "w-full rounded-full flex items-center justify-center gap-2 bg-linear-to-r from-rose-800 to-rose-500 hover:from-rose-500 hover:to-rose-800 text-white font-bold shadow-lg transition-all duration-300 px-8 py-2 text-base lg:text-lg",
                id === "pro"
                  ? "border-rose-900"
                  : "border-rose-100 from-rose-400 to-rose-500"
              )}
            >
              Buy Now <ArrowRight size={18} />
            </Link>
          </div>

          <p>{name}</p>
        </div>
      </MotionDiv>
    </>
  );
};
export default function Pricing() {
  return (
    <>
      <section id="pricing">
        <MotionSection variants={containerVariants} 
      initial='hidden'
      whileInView='visible'
      viewport={{once:true,margin:'-100px'}} className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
          <MotionDiv variants={itemVariants} className="flex items-center justify-center w-full pb-12">
            <h2 className="uppercase font-bold text-xl mb-8 text-rose-500">
              Pricing
            </h2>
          </MotionDiv>
          <div className="relative flex justify-center flex-col  lg:flex-row items-center lg:items-stretch gap-8">
            {pricingPlans.map((e) => (
              <PricingCard key={e.id} {...e} />
            ))}
          </div>
        </MotionSection>
      </section>
    </>
  );
}
