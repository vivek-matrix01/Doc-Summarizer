import { ExternalLink, FileText } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import DownloadSummaryBtn from "./DownloadSummary";

interface Prop{
    fileName:string;
    fileUrl:string;
    title:string;
    summaryText:string;
    createdAt:string;
}
export default function SourceInfo({fileName,fileUrl,title,summaryText,createdAt}:Prop){


    return <>
    <div className="flex flex-col lg:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center justify-center gap-2 mt-4">
            <FileText className="h-4 w-4 text-rose-400"/>
            <span>Source: {fileName}</span>
        </div>
        <div className="flex gap-2">
            <div className="">
            <Button variant={'ghost'} size={'sm'} className="h-8 px-3 text-rose-600 hover:text-rose-700 hover:bg-rose-50"><Link href={fileUrl ||'#'} target="_blank"className="flex gap-2 items-center">
            <ExternalLink className="w-4 h-4 mr-1"/>View Original</Link></Button></div>
            <div className=""><DownloadSummaryBtn fileName={fileName}
                  
                  fileUrl={fileUrl}
                  title={title}
                  summaryText={summaryText}
                  createdAt={createdAt}/></div>
        </div>
    </div>
    
    </>
}