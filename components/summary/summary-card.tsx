import {
    Card,
  
  } from "@/components/ui/card"
import {formatDistanceToNow} from "date-fns";
import {   Clock5, FileText} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import DeleteButton from "./deleteButton";
import { MotionDiv } from "../ui/common/motion-wrapper";
import { itemVariants } from "@/utils/constant";


const SummaryHeader=({url,title,created_at,}:{url:string,title:string,created_at:string})=>{
    return <>
    <div className="flex items-start gap-2 sm:gap-4">
        <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-rose-500 truncate mt-1" />
        <div className="flex-1 min-w-0">
            <h3 className="text-base xl:text-lg font-semibold text-gray-900 w-4/5 truncate">{title}</h3>
            <div className="flex items-end gap-1 mt-1 text-xs text-gray-600"><Clock5 className="w-4 h-4"/>{formatDistanceToNow( new Date(created_at),{addSuffix:true})} </div>
        </div>
    </div>

    </>}
const StatusBadge=({status}:{status:string})=>{
    return<>
    <span className={cn('px-3 py-1 text-xs font-medium rounded-full capitalize',status==='completed'?'bg-green-100 text-green-800':'bg-yellow-100 text-yellow-800')}>{status}</span>
    </>
}
export default function SummaryCard({summary}:any) {
    return <>
   <MotionDiv
           variants={itemVariants}
           initial='hidden'
           animate='visible'
           whileHover={{scale:1.05,transition:{duration:0.2,ease:'easeOut'}}} className="relative h-full">
   <Card>
  <div className="absolute p-1 border rounded top-2 right-2 bg-gray-100 text-gray-800"><DeleteButton id={summary.id}/> </div>
  <Link className="block p-4 sm:p-6" href={`summaries/${summary.id}`}>
  <div className="flex flex-col gap-3">
    <SummaryHeader url={summary.original_file_url} title={summary.title} created_at={summary.created_at}/>
    <p className="text-gray-600 line-clamp-2 text-sm sm:text-base pl-2">{summary.summary_text}</p>
    <div className="flex justify-between items-center mt-2 sm:mt-4">
        <StatusBadge status={summary.status}/>
    </div>
  </div>
  </Link>
</Card>

   </MotionDiv>
    </>
}