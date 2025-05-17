'use client'

import GetPdfText from "@/actions/u";
import { askGemini } from "@/lib/gemini";
import { useEffect, useRef, useState} from "react";
import TextViewer from "./TextViewer";

export default  function AskQuestion({fileUrl}:{fileUrl:string}){
  const [text, setText] = useState<string>('');
    const input=useRef<HTMLInputElement>(null);
    const [data, setData] = useState<string>('');
    useEffect(() => {
        async function fetchData() {
            const pdfText = await GetPdfText(fileUrl);
            setData(pdfText);
        }
        fetchData();
    }, [fileUrl]);
    
    
    const handleSubmit=async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if (!input.current) return;
        
        
        const value = input.current.value.trim() ;
        const answer:any= await askGemini(data,value);
        const answerText = answer?.parts[0].text || "No answer found.";
       setText(answerText);
        
    input.current.value='';
}
return <>
<div className="">
    <div className=" flex">
    <div className="w-50"><img src="/robot.gif" alt="spaceShip" /></div>
    <div className=" w-full max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
      <input
        type="text"
        
        ref={input}
        
        placeholder="Ask your question here..."
        className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 text-base"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition duration-200"
      >
        Submit
      </button>
    </form>
  </div></div>
  <div className="">
    <TextViewer text={text} />
  </div></div>
  </>
}