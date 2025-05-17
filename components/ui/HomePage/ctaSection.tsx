import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../button";
import { currentUser } from "@clerk/nextjs/server";
import { CtaLink } from "../common/PricingLink";

export default async function CtaSection() {
   const user =await currentUser();
  return (
    <>
      <section className="bg-gray-50 py-12">
        <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 ">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready To Save Hours Of Reading Time?
              </h2>
              <p className="mx-auto max-w-2xl text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Transform lengthy documents into clear ,actionable insights with
                our AI-powered summarizer.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
              <div className="">
                <Button
                  variant={"link"}
                  className="w-full min-[400px]:w-auto bg-linear-to-r from-slate-900 to-rose-500 hover:from-rose-500 hover:to-slate-900 hover:text-white text-white transition-all ease-in duration-300  "
                 
                >
                  <CtaLink UserId={user?.id||'NOUSER'}/>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
