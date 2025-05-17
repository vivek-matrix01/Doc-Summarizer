"use client";
import { forwardRef } from "react";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}
 const UploadFormInput = forwardRef<HTMLFormElement, UploadFormInputProps>(({onSubmit,isLoading},ref) => {
  return(  <>
    <form
    ref={ref}
      action=""
      className="flex flex-col items-center justify-center gap-6 text-center"
      onSubmit={onSubmit}
    >
      <div className="flex justify-end items-center gap-2 w-full">
        <Input
          type="file"
          id="file"
          name="file"
          className={cn("text-center w-full",`${isLoading ? "cursor-not-allowed opacity-50" : ""}`)}
          accept="application/pdf"
          required
          disabled={isLoading}
        />
       
        <Button disabled={isLoading} >{isLoading?(<><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Processing ...</>):'Upload Your PDF !'}</Button>
      </div>
    </form>
  </>)
})
export default UploadFormInput;