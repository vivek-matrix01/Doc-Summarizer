'use server'

import { fetchAndExtractText } from "@/lib/langchain";


export default async function GetPdfText(url:string){

    try{
        const pdftext = await fetchAndExtractText(url);
        return pdftext;
    }
    catch(err){
        console.error("Error fetching PDF text:", err);
        return '';
    }
}