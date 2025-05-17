import AskQuestion from "@/components/summary/askQuestion";
import SourceInfo from "@/components/summary/source-info";
import SummaryViewer from "@/components/summary/summary-viewer";
import SummaryHeader from "@/components/summary/summaryHeader";
import { Card } from "@/components/ui/card";
import { MotionDiv } from "@/components/ui/common/motion-wrapper";
import { getSummaryById } from "@/lib/summaries";
import { notFound } from "next/navigation";

export default async function SummaryPage(props:{params:Promise<{id:string}>}){
    const params=await props.params;
    const id=params.id;
    const summary=await getSummaryById(id);
    const summaryText= await summary?.summary_text|| " Error!!";

    const wordCount=summaryText.split(/\s+/).filter((word:string)=>word.length>0).length;
   const readingTime=Math.ceil((wordCount||0)/200);
    if(!summary){
        notFound();
    }
    

    return <>
    <div className="relative isolate min-h-screen bg-linear-to-b from-rose-50/40 to white">
        <div className="container mx-auto flex flex-col gap-4">
            <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-24 sm:space-y-4 lg:space-y-1">
                <MotionDiv
                        initial='hidden'
                        animate='visible'
                        transition={{duration:0.5}}
                        whileHover={{scale:1.05}}
                 className="flex flex-col ">
                    <h1><SummaryHeader title={summary.title} createdAt={summary.created_at} readingTime={readingTime}/></h1>
                </MotionDiv>
                {summary.file_name && <SourceInfo fileName={summary.file_name}
                  
                  fileUrl={summary.original_file_url}
                  title={summary.title}
                  summaryText={summary.summary_text}
                  createdAt={summary.created_at}
                />}
               <div className="font-bold text-red-400">{wordCount} words</div> 
               <MotionDiv
                        initial='hidden'
                        animate='visible'
                        transition={{duration:0.5}} className="">
                <Card className="mt-5 relative">
                <div className="container mx-auto bg-white p-2">
                <SummaryViewer summary={summary.summary_text}/>
                </div></Card>
                <AskQuestion  fileUrl={summary.original_file_url}/>
                </MotionDiv>
            </div>
        </div>
    </div>
    </>
}