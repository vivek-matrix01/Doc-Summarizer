"use server";

import { getDbConnection } from "@/lib/db";
import generateSummaryGemini from "@/lib/gemini";
import { fetchAndExtractText } from "@/lib/langchain";
import { generateSummaryOpenAi } from "@/lib/openAi";
import formatFileNameAsTitle from "@/utils/format-title";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface PdfSummariesType{user_id?:string; file_url:string; summary_text:string; title:string; file_name:string;
}
export async function generateSummary({fileUrl,fileName}:{fileUrl:string,fileName:string}
) {
  
  if (!fileUrl) {
    return { success: false, message: " file uploaded failed", data: null };
  }

  if (!fileUrl) {
    return { success: false, message: " file uploaded failed", data: null };
  }
  try {
   
    const pdftext = await fetchAndExtractText(fileUrl);
    let summary;
   
    try {
      summary = await generateSummaryOpenAi(pdftext);
      console.log("Summary from OpenAi:", summary);
     
      
      
    } catch (err) {
      console.error("Error generating summary from OpenAi:", err);

      //trying with gemini
      if (err instanceof Error ) {
        console.error("Error message:", err.message);

        try{
          let summary;
          summary = await generateSummaryGemini(pdftext);
          console.log("Summary from Gemini:", summary|| "No summary text available");
        }
        catch(err){
          console.error("Error generating summary from Gemini:", err);
          throw new Error('Failed to generate Summary with available Ai models');
        }

      }
    }
    if (!summary) {
      return {
        success: false,
        message: "Failed to generate summary",
        data: null,
      };

    }
    const formatedFileName=formatFileNameAsTitle(fileName);
    return {
      success: true,
      message: "File uploaded successfully",
     data:{summary,title:formatedFileName},

    }

  } catch (err) {
    console.error("Error fetching or extracting text from PDF:", err);
    return { success: false, message: " file uploaded failed", data: null };
  }
}

async function saveSummaryToDb({user_id, file_url, summary_text, title, file_name}:PdfSummariesType){
  try{
    console.log(file_url)
    const sql=await getDbConnection();
  const [savedSummary]=  await sql`INSERT INTO pdf_summaries (user_id, original_file_url, summary_text, title, file_name)
VALUES (
  ${user_id}, ${file_url}, ${summary_text}, ${title}, ${file_name} 
   
) RETURNING id ,summary_text
`

return savedSummary;
  }
  catch(err){
  console.error("Error saving summary to database:", err);
  throw err;
  }
  
  
}

export async function storeUploadPdfData({ file_url, summary_text, title, file_name}:PdfSummariesType){

  let savedSummary:any;
  try{

    const {userId}= await auth();
    if(!userId){
      return { success: false, message:   " User Id not found"};}
      
       savedSummary=await saveSummaryToDb({user_id:userId, file_url, summary_text,title, file_name});
       if(!savedSummary){
        return { success: false, message: "Error Saving PDF summary"};
        }    

        
      }
      catch(err){
        return { success: false, message: err instanceof Error ? err.message:  " Error Saving PDF summary"};
      }

      //Revalidating Our Cache
      if(savedSummary.id){
        
      revalidatePath(`/summaries/${savedSummary.id}`);}
        return { success: true, message: "PDF summary saved successfully",data:{id:savedSummary.id}};
}