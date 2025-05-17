import { MotionDiv } from "@/components/ui/common/motion-wrapper";
import UploadFormBody from "@/components/upload/uploadBody";
import UploadHeader from "@/components/upload/uploadHeader";
import { hasReachedUploadLimit } from "@/lib/user";
import { containerVariants} from "@/utils/constant";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export default async function UploadPage() {

  const user =await currentUser();

  if(!user?.id){
    redirect('/sign-in');
  }

  const userId=user.id;
  const {hasReachedLimit}=await hasReachedUploadLimit(userId);
  if(hasReachedLimit){
    toast.error("You have reached your upload limit. Please upgrade your plan to continue uploading files.");
    return redirect('/dashboard');

  }

  return (
    <>
      <section className="min-h-screen">
        <MotionDiv
        variants={containerVariants}
        initial='hidden'
        animate='visible'

        className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 space-y-2">
          <UploadHeader />
          <UploadFormBody />
        </MotionDiv>
      </section>
    </>
  );
}
