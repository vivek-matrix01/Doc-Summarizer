"use client";
import {  z } from "zod";
import UploadFormInput from "./uploadFormInput";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import { generateSummary, storeUploadPdfData } from "@/actions/upload-actions";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
const schema = z.object({
  file: z
    .instanceof(File, { message: "INVALID File " })
    .refine((file) => file.size <= 20 * 1024 * 1024, {
      message: "File size must be less then 20 MB",
    })
    .refine((file) => file.type.startsWith("application/pdf"), {
      message: "File must be a PDF",
    }),
});
export default function UploadFormBody() {
  const router = useRouter();
  const formRef=useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {

    onClientUploadComplete: () => {
      console.log("uploaded successfully!");
    },
    
    onUploadError: (err) => {
      console.error("error occurred while uploading", err);
      toast.error("error occurred while uploading");
    },
    onUploadBegin: (data) => {
      console.log(`upload has begun with data : ${data}`);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
      setIsLoading(true);
      
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;
    const validatedFile = schema.safeParse({ file });
    if (!validatedFile.success) {
      console.log(
        validatedFile.error.flatten().fieldErrors.file?.[0] ?? "INVALID FILE"
      );
      toast.error("Please Choose a different file type or size ");
      setIsLoading(false);
      return;
    }
    toast.info("Uploading File ...");
    const uploadResponse = await startUpload([file]);
    if (!uploadResponse) {
      toast.error("Something went wrong while uploading the file");
      setIsLoading(false);

      return;
    }
    toast.success("File Uploaded Successfully !");
    const uploadFileUrl=uploadResponse[0].serverData.fileUrl;
    const result = await generateSummary({fileUrl:uploadFileUrl,fileName:file.name});
    toast.info("Generating Summary ...");
   
    const {data=null,message=null}=result||{};
    if(data){
      toast.success("Saving Summary to our DataBase !");
     
      
    }
    let storeResult:any;
    if(data?.summary){
    storeResult=  await storeUploadPdfData({
        summary_text:data.summary,
        file_url:uploadFileUrl ,
        title:data.title,
        file_name:file.name,
      })
      toast.success("Your PDF has been successfully summarized and saved !");
      formRef.current?.reset();
      //redirect to summary page
      router.push(`/summaries/${storeResult.data.id}`);
    }
  }
  catch(err){
    console.error("Error in handleSubmit", err);
    setIsLoading(false);

  formRef.current?.reset();
  }
  
  finally{
    setIsLoading(false);
  }
  
  


  
}
  return   <>

      <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
        <UploadFormInput isLoading={isLoading} ref={formRef} onSubmit={handleSubmit} />

      </div>

    </>
}