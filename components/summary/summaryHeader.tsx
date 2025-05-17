import Link from "next/link";
import { Button } from "../ui/button";
import { Calendar, ChevronLeft, Clock, Sparkles } from "lucide-react";
import { Badge } from "../ui/badge";

export default function SummaryHeader({title,createdAt,readingTime}:{title:string,createdAt:string,readingTime:number}){

    return <><div className="flex-col flex">
    <div className="flex gap-4 mb-4 justify-between">
        <div className=" flex flex-1 flex-wrap items-center  gap-10">
            <div className="">
                <Badge  variant='secondary' className="bg-amber-50 text-rose-600 border-rose-200 p-2 rounded-2xl"><Sparkles className="w-4 h-4 animate-pulse text-amber-600"/>AI Summary</Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground
            ">
                <Calendar className="h-4 w-4 text-rose-400"/>
                {new Date(createdAt).toLocaleDateString('en-US',{
                    year:'numeric',
                    month:'long',
                    day:'numeric'
                })}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground ">
                <Clock className="h-4 w-4 text-rose-400"/>
                {readingTime} min read
            </div>
        </div>
        <div className=""><Link href={'/dashboard'}><Button className="bg-red-400 text-amber-50 hover:no-underline hover:scale-105 p-2 hover:bg-rose-700 transition-all duration-300 text-sm" variant={'link'} size={'sm'}>
            <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 animate-bounce"/>  Back <span className="hidden sm:inline">to Dashboard</span></Button></Link></div>
    </div>
                <div className="text-2xl lg:text-4xl font-bold lg:tracking-tight">
                    <span className="bg-linear-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">{title}</span></div>
    </div>
    </>
}