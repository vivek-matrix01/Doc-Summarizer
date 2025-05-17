"use server"
import { SUMMARY_SYSTEM_PROMPT } from "@/utils/openAiPrompt";
import { GoogleGenAI } from "@google/genai";
const apiKey=process.env.GOOGLE_API_KEY ;


export default async function generateSummaryGemini(pdftext: string) {


const ai = new GoogleGenAI({ apiKey: apiKey });

try{
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
   
    contents: [
        
        { role: "user", parts: [{text:SUMMARY_SYSTEM_PROMPT},{ text: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdftext}` }] },
      ],


         
  });
  return response?.candidates?.[0]?.content ?? "";


}catch(err){

    console.error("Error generating summary from Gemini:", err);
}
}

export const  askGemini=async (pdftext: string,question:string='suggest me title for this document') =>{

console.log(apiKey);
  const ai = new GoogleGenAI({ apiKey: apiKey });
  
  try{
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
     
      contents: [
          
          { role: "user", parts: [{ text: `You are a highly qualified proffesor who explains things in  very concise,simple and easy to understan  manner.Now answer my query in context to this document= \n\n${pdftext}  , my query is this=${question}`  }] },
        ],
  
  
           
    });

  
    return response?.candidates?.[0]?.content ?? "";
  
  
  }catch(err){
  
      console.error("Error generating answer from Gemini:", err);
  }
  }


