import { currentUser } from "@clerk/nextjs/server";
import { UploadThingError } from "uploadthing/server";
import { createUploadthing, type  FileRouter} from "uploadthing/next";
const a=createUploadthing();

export const ourFileRouter = {
   
    pdfUploader: a({pdf: { maxFileSize: "32MB" }}).middleware(async (req) => {
        const user = await currentUser();

        if (!user) {
            throw new UploadThingError("UNAUTHORIZED - You must be logged in to Doc Summarizer", );
        }
        return { userId: user.id };
    }).onUploadComplete(async ({file, metadata}:any) => {
        console.log("Upload complete for userId:");
        return {userId: metadata.userId, fileUrl:file.url,fileName:file.name};
    }),
} satisfies FileRouter;
export type OurFileRouter = typeof ourFileRouter;