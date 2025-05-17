"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


import { Trash2 } from "lucide-react"
import { Button } from "../ui/button"
import { useState, useTransition } from "react"
import { deleteSummaryAction } from "@/actions/summaryDelete-action"
import { toast } from "sonner"


export default function DeleteButton({id}:{id:string}) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition();
  const handleDelete = async(id:string) => {
    startTransition(async() => {
    const result=await deleteSummaryAction(id);
    if (!result.success) {
    toast.error("Error deleting summary");
    }  
    setOpen(false); 
  });
  }
return <>
<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger><Trash2 className='w-4  h-4'/></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Delete Summary?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your summary
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant='ghost'  className="bg-gray-50 border-gray-200 hover:bg-gray-100 hover:text-gray-600" onClick={()=>setOpen(false)}>Cancel</Button>
      <Button variant='destructive'className="bg-gray-900 hover:bg-gray-600 " onClick={()=>handleDelete(id)}>{isPending?'Deleting...':'Delete'}</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

</>
}